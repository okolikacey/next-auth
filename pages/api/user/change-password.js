import { getSession } from "next-auth/react";
import { connectToDatabase } from "../../../lib/db";
import { hashPassword, verifyPassword } from "../../../lib/auth";

async function handler(req, res) {
  if (req.method !== "PATCH") return;

  const session = await getSession({ req });

  if (!session) return res.status(401).json({ message: "Not authenticated" });

  const userEmail = session.user.email;
  const { oldPassword, newPassword } = req.body;

  const client = await connectToDatabase();
  const users = client.db().collection("users");
  const user = await users.findOne({ email: userEmail });

  if (!user) return res.status(404).json({ message: "User not found" });

  const currentPassword = user.password;
  const isValid = await verifyPassword(oldPassword, currentPassword);

  if (!isValid)
    return res
      .status(403)
      .json({ message: "You do not have the permissions to perform this action" });

  const hashedPassword = await hashPassword(newPassword);
  const result = await users.updateOne(
    { email: userEmail },
    { $set: { password: hashedPassword } }
  );

  res.status(200).json({ message: "Password updated" });
}

export default handler;
