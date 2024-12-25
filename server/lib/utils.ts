import { prisma } from "./prisma";

export async function updateUserStatus(userId: string, status: string) {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { status: status }, 
    });
    return updatedUser;
  } catch (error) {
    throw new Error('Failed to update user status');
  }
}
