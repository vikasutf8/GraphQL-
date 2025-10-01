import prisma from "../clients/db";

class UserService {
  public static followUser(from: string, to: string) {
    return prisma.follows.create({
      data: {
        follower: { connect: { id: from } },
        following: { connect: { id: to } },
      },
    });
  }

  public static async unfollowUser(from: string, to: string) {
    return prisma.follows.delete({
      where: { followerId_followingId: { followerId: from, followingId: to } },
    });
  }
}

export default UserService;
