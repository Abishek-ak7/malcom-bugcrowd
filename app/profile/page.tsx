'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { supabase } from '../../lib/supabaseClient';
import { updateUser } from '../../redux/userSlice';

/**
 * Bug bounty researcher profile page (light theme, LinkedIn-like).
 * - Fetches the user's row from `users` table using user.id (from Redux)
 * - Allows editing of profile fields and uploading avatar/resume into Supabase storage
 * - Writes updates to `users` table and updates Redux via updateUser
 *
 * Required Supabase columns (recommended):
 * id (uuid) | username | email | name | bio | avatar_url | resume_url |
 * handle | location | website | twitter | skills | preferred_targets |
 * total_bounties (int) | total_rewards (numeric or text)
 *
 * Make sure RLS / policies are setup correctly in Supabase (auth.uid() = id).
 */

export default function ProfilePage() {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.currentUser);

  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [isOwner, setIsOwner] = useState<boolean>(!!user); // simple check; tweak if needed

  const [profile, setProfile] = useState({
    id: user?.id || '',
    name: user?.name || '',
    handle: user?.handle || '',
    email: user?.email || '',
    location: user?.location || '',
    website: user?.website || '',
    twitter: user?.twitter || '',
    bio: user?.bio || '',
    skills: user?.skills || '', // comma separated
    preferred_targets: user?.preferred_targets || '',
    avatar_url: user?.avatar || '',
    resume_url: user?.resume || '',
    total_bounties: user?.total_bounties ?? 0,
    total_rewards: user?.total_rewards ?? 0,
    experience: user?.experience ?? 0,
    phone: user?.phone || null,
  });

  // Fetch full profile from Supabase on mount
  useEffect(() => {
    const fetchUser = async () => {
      if (!user?.id) return;
      setLoading(true);
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        // if 403 or RLS issue, let user know
        toast.error('Unable to fetch profile data (check auth / RLS).');
        setLoading(false);
        return;
      }

      if (data) {
        setProfile({
          id: data.id,
          name: (data.username || data.name) ?? '',
          handle: data.handle ?? '',
          email: data.email ?? '',
          location: data.location ?? '',
          website: data.website ?? '',
          twitter: data.twitter ?? '',
          bio: data.bio ?? '',
          skills: data.skills ?? '',
          preferred_targets: data.preferred_targets ?? '',
          avatar_url: data.avatar_url ?? '',
          resume_url: data.resume_url ?? '',
          total_bounties: data.total_bounties ?? 0,
          total_rewards: data.total_rewards ?? 0,
          experience: data.experience ?? 0,
          phone: data.phone ?? null,
        });
        setIsOwner(true);
      }
      setLoading(false);
    };

    fetchUser();
  }, [user?.id]);

  // Generic change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setProfile({ ...profile, [e.target.name]: e.target.value });

  // Avatar upload -> Supabase storage (avatars bucket)
  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user?.id) return toast.error('No file or user id');

    const filePath = `avatars/${user.id}-${Date.now()}-${file.name}`;
    setLoading(true);

    const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file, { upsert: true });
    if (uploadError) {
      toast.error('Avatar upload failed.');
      setLoading(false);
      return;
    }

    const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
    const publicUrl = data?.publicUrl || '';
    setProfile((p) => ({ ...p, avatar_url: publicUrl }));
    toast.success('Avatar uploaded (not saved yet).');
    setLoading(false);
  };

  // Resume upload -> Supabase storage (resumes bucket)
  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user?.id) return toast.error('No file or user id');

    const filePath = `resumes/${user.id}-${Date.now()}-${file.name}`;
    setLoading(true);

    const { error: uploadError } = await supabase.storage.from('resumes').upload(filePath, file, { upsert: true });
    if (uploadError) {
      toast.error('Resume upload failed.');
      setLoading(false);
      return;
    }

    const { data } = supabase.storage.from('resumes').getPublicUrl(filePath);
    const publicUrl = data?.publicUrl || '';
    setProfile((p) => ({ ...p, resume_url: publicUrl }));
    toast.success('Resume uploaded (not saved yet).');
    setLoading(false);
  };

  // Save changes to Supabase and Redux
  const handleSave = async () => {
    if (!user?.id) return toast.error('User not authenticated');

    setLoading(true);

    // Build updates object only with allowed columns
    const updates: any = {
      username: profile.name, // if you store in username column
      name: profile.name,
      handle: profile.handle || null,
      location: profile.location || null,
      website: profile.website || null,
      twitter: profile.twitter || null,
      bio: profile.bio || null,
      skills: profile.skills || null,
      preferred_targets: profile.preferred_targets || null,
      avatar_url: profile.avatar_url || null,
      resume_url: profile.resume_url || null,
      total_bounties: Number(profile.total_bounties) || 0,
      total_rewards: profile.total_rewards || 0,
      experience: Number(profile.experience) || 0,
      phone: profile.phone || null,
    };

    // Attempt update
    const { error } = await supabase.from('users').update(updates).eq('id', user.id);

    if (error) {
      toast.error('Update failed. Check RLS/policies and that your user row exists.');
      console.error(error);
      setLoading(false);
      return;
    }

    // Update Redux (partial)
    dispatch(
      updateUser({
        name: profile.name,
        avatar: profile.avatar_url,
        bio: profile.bio,
        resume: profile.resume_url,
        handle: profile.handle,
        location: profile.location,
        website: profile.website,
        twitter: profile.twitter,
        skills: profile.skills,
        preferred_targets: profile.preferred_targets,
        total_bounties: profile.total_bounties,
        total_rewards: profile.total_rewards,
        experience: profile.experience,
        phone: profile.phone,
      })
    );

    toast.success('Profile saved successfully.');
    setEditing(false);
    setLoading(false);
  };

  // Quick UI for stats formatting
  const formatCurrency = (val: any) => {
    if (!val && val !== 0) return '—';
    try {
      const n = Number(val);
      if (Number.isNaN(n)) return String(val);
      return Intl.NumberFormat('en-IN', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
    } catch {
      return String(val);
    }
  };

  // If not logged in
  if (!user) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center p-8">
        <div className="max-w-xl text-center">
          <h2 className="text-2xl font-semibold mb-4">You need to sign in</h2>
          <p className="mb-6 text-gray-600">Please log in to view or edit your profile.</p>
          <div className="flex gap-4 justify-center">
            <Link href="/login" className="bg-blue-600 px-4 py-2 rounded text-white">Login</Link>
            <Link href="/signup" className="border border-gray-300 px-4 py-2 rounded">Signup</Link>
          </div>
        </div>
      </div>
    );
  }

  // Main render
  return (
    <div className="min-h-screen bg-[#f8f9fa] text-gray-900">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-3xl text-blue-600">security</span>
            <div>
              <h1 className="text-xl font-bold">Bug Bounty Profile</h1>
              <p className="text-sm text-gray-500">Public researcher profile & stats</p>
            </div>
          </div>

          <div>
            {!editing ? (
              <div className="flex gap-3">
                <button
                  onClick={() => setEditing(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
                >
                  Edit Profile
                </button>
              </div>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className={`px-4 py-2 rounded-lg text-white font-medium ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
                >
                  {loading ? 'Saving...' : 'Save'}
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Profile top area */}
      <main className="container mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row gap-10">
          {/* left: avatar & contact */}
          <aside className="w-full md:w-1/3">
            <div className="flex flex-col items-center md:items-start gap-6">
              <div className="relative">
                <Image
                  src={user?.avatar || "/globe.svg"}
                  alt="Profile"
                  width={150}
                  height={150}
                  className="rounded-full object-cover"
                />

                {editing && (
                  <label className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow cursor-pointer">
                    <input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
                    <span className="material-symbols-outlined text-blue-600">edit</span>
                  </label>
                )}
              </div>

              <div className="w-full">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">{profile.name || 'Your Name'}</h2>
                    <p className="text-sm text-gray-600">@{profile.handle || 'handle'}</p>
                  </div>
                </div>

                <div className="mt-4 space-y-2 text-sm text-gray-700">
                  <p><strong>Email:</strong> <span className="text-gray-600">{profile.email}</span></p>
                  <p><strong>Location:</strong> <span className="text-gray-600">{profile.location || '—'}</span></p>
                  <p><strong>Website:</strong> {profile.website ? <a href={profile.website} target="_blank" className="text-blue-600 hover:underline">{profile.website}</a> : <span className="text-gray-600">—</span>}</p>
                  <p><strong>Twitter:</strong> {profile.twitter ? <a href={profile.twitter.startsWith('http') ? profile.twitter : `https://twitter.com/${profile.twitter}`} target="_blank" className="text-blue-600 hover:underline">{profile.twitter}</a> : <span className="text-gray-600">—</span>}</p>
                </div>

                <div className="mt-6">
                  <label className="text-sm font-medium">Resume</label>
                  <div className="mt-2 flex items-center gap-3">
                    {editing ? (
                      <>
                        <input type="file" accept=".pdf,.doc,.docx" onChange={handleResumeUpload} />
                        {profile.resume_url && (
                          <a href={profile.resume_url} target="_blank" className="text-blue-600 hover:underline text-sm">View current</a>
                        )}
                      </>
                    ) : profile.resume_url ? (
                      <a href={profile.resume_url} target="_blank" className="text-blue-600 hover:underline text-sm">View resume</a>
                    ) : (
                      <span className="text-gray-600 text-sm">No resume</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-sm text-gray-500">Bounties</p>
                <p className="text-xl font-semibold">{profile.total_bounties ?? 0}</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-sm text-gray-500">Total Rewards</p>
                <p className="text-xl font-semibold">{formatCurrency(profile.total_rewards)}</p>
              </div>
            </div>
          </aside>

          {/* right: main info */}
          <section className="flex-1">
            {/* Basic / headline area */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              {/* headline / editables */}
              <div className="flex flex-col gap-3">
                {/* Name & handle (editable inline) */}
                <div>
                  {editing ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Full name</label>
                        <input name="name" value={profile.name} onChange={handleChange} className="mt-1 w-full border border-gray-300 rounded p-2" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Handle</label>
                        <input name="handle" value={profile.handle} onChange={handleChange} className="mt-1 w-full border border-gray-300 rounded p-2" placeholder="e.g. hackerHandle" />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h3 className="text-lg font-semibold">{profile.name}</h3>
                      <p className="text-sm text-gray-500">@{profile.handle || 'handle'}</p>
                    </div>
                  )}
                </div>

                {/* Bio */}
                <div className="mt-4">
                  <label className="text-sm font-semibold text-gray-700">About</label>
                  {editing ? (
                    <textarea name="bio" value={profile.bio} onChange={handleChange} rows={4} className="mt-2 w-full border border-gray-300 rounded p-3" placeholder="Short bio / researcher summary" />
                  ) : (
                    <p className="text-gray-700 mt-2">{profile.bio || <span className="text-gray-400">No bio yet.</span>}</p>
                  )}
                </div>

                              <div>
                <label className="text-sm font-medium text-gray-700">Phone Number</label>
                {editing ? (
                  <input
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    className="mt-1 w-full border border-gray-300 rounded p-2"
                    placeholder="+91 9876543210"
                  />
                ) : (
                  <p className="mt-2 text-gray-700">{profile.phone || '—'}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Experience (Years)</label>
                {editing ? (
                  <input
                    name="experience"
                    value={profile.experience}
                    onChange={handleChange}
                    className="mt-1 w-full border border-gray-300 rounded p-2"
                    placeholder="e.g. 3"
                  />
                ) : (
                  <p className="mt-2 text-gray-700">{profile.experience ? `${profile.experience} years` : '—'}</p>
                )}
              </div>

                {/* Skills & preferred targets */}
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Skills (comma separated)</label>
                    {editing ? (
                      <input name="skills" value={profile.skills} onChange={handleChange} className="mt-1 w-full border border-gray-300 rounded p-2" placeholder="XSS, SSRF, BAP, Mobile, API..." />
                    ) : (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {profile.skills ? profile.skills.split(',').map((s: string, i: number) => (
                          <span key={i} className="text-sm bg-blue-50 text-blue-700 px-2 py-1 rounded">{s.trim()}</span>
                        )) : <span className="text-gray-500">No skills listed</span>}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">Preferred targets / focus</label>
                    {editing ? (
                      <input name="preferred_targets" value={profile.preferred_targets} onChange={handleChange} className="mt-1 w-full border border-gray-300 rounded p-2" placeholder="Web apps, Mobile, APIs, IoT..." />
                    ) : (
                      <p className="mt-2 text-gray-700">{profile.preferred_targets || <span className="text-gray-500">Not specified</span>}</p>
                    )}
                  </div>
                </div>

                {/* Contact & social links editable */}
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Location</label>
                    {editing ? (
                      <input name="location" value={profile.location} onChange={handleChange} className="mt-1 w-full border border-gray-300 rounded p-2" placeholder="City, Country" />
                    ) : (
                      <p className="mt-2 text-gray-700">{profile.location || <span className="text-gray-500">—</span>}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">Website</label>
                    {editing ? (
                      <input name="website" value={profile.website} onChange={handleChange} className="mt-1 w-full border border-gray-300 rounded p-2" placeholder="https://..." />
                    ) : (
                      profile.website ? <a href={profile.website} target="_blank" className="mt-2 inline-block text-blue-600 hover:underline">{profile.website}</a> : <p className="mt-2 text-gray-700"><span className="text-gray-500">—</span></p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">Twitter</label>
                    {editing ? (
                      <input name="twitter" value={profile.twitter} onChange={handleChange} className="mt-1 w-full border border-gray-300 rounded p-2" placeholder="@yourhandle or https://" />
                    ) : (
                      profile.twitter ? <a href={profile.twitter.startsWith('http') ? profile.twitter : `https://twitter.com/${profile.twitter}`} target="_blank" className="mt-2 inline-block text-blue-600 hover:underline">{profile.twitter}</a> : <p className="mt-2 text-gray-700"><span className="text-gray-500">—</span></p>
                    )}
                  </div>
                </div>

                {/* Numeric stats editing */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Total Bounties</label>
                    {editing ? (
                      <input name="total_bounties" value={String(profile.total_bounties)} onChange={handleChange} type="number" className="mt-1 w-full border border-gray-300 rounded p-2" />
                    ) : (
                      <p className="mt-2 text-gray-700">{profile.total_bounties}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">Total Rewards (USD)</label>
                    {editing ? (
                      <input name="total_rewards" value={String(profile.total_rewards)} onChange={handleChange} className="mt-1 w-full border border-gray-300 rounded p-2" placeholder="numeric value" />
                    ) : (
                      <p className="mt-2 text-gray-700">{formatCurrency(profile.total_rewards)}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Activity / recent reports placeholder */}
            <div className="mt-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h4 className="text-lg font-semibold">Recent activity</h4>
                <p className="text-sm text-gray-600 mt-2">This area can show recent reports, accepted bounties, and public links (coming soon).</p>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 text-center text-sm text-gray-500">
        © 2025 Malcom_Company — All rights reserved.
      </footer>
    </div>
  );
}
