import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userId, uid, reason, otherReason } = req.body;

    if (!userId || !uid) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create admin client with service role key
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    console.log('Deleting user:', userId, uid);

    // Step 1: Log deletion reason (optional)
    if (reason) {
      await supabaseAdmin.from("account_deletions").insert([{
        user_id: userId,
        uid: uid,
        reason: reason,
        other_reason: otherReason || null,
        deleted_at: new Date().toISOString(),
      }]);
    }

    // Step 2: Delete from users table
    const { error: profileError } = await supabaseAdmin
      .from("users")
      .delete()
      .eq("id", userId);

    if (profileError) {
      console.error("Profile delete error:", profileError);
      return res.status(500).json({ error: 'Failed to delete profile: ' + profileError.message });
    }

    // Step 3: Delete from Supabase Auth
    const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(uid);

    if (authError) {
      console.error("Auth delete error:", authError);
      return res.status(500).json({ error: 'Failed to delete auth user: ' + authError.message });
    }

    console.log('Account deleted successfully');
    return res.status(200).json({ success: true, message: 'Account deleted successfully' });

  } catch (error) {
    console.error("Delete account API error:", error);
    return res.status(500).json({ error: error.message });
  }
}