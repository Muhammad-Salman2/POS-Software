import prisma from "../../../db/db.js";
import ApiError from "../../../utils/ApiError.js";
import ApiResponse from "../../../utils/ApiResponse.js";

export const updateStore = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const userId = req.user.id;

    // Check if store exists and user is owner
    const existingStore = await prisma.store.findFirst({
      where: {
        id: Number(id),
        ownerId: userId,
        isDeleted: false
      }
    });

    if (!existingStore) {
      return ApiError(res, 404, "Store not found or you don't have permission to update");
    }

    if (!name) {
      return ApiError(res, 400, "Store name is required");
    }

    const updatedStore = await prisma.store.update({
      where: {
        id: Number(id)
      },
      data: {
        name
      },
      include: {
        owner: {
          select: {
            id: true,
            fullname: true,
            email: true
          }
        },
        members: {
          select: {
            id: true,
            fullname: true,
            email: true
          }
        }
      }
    });

    return ApiResponse(res, 200, updatedStore, "Store updated successfully");
  } catch (error) {
    console.error("Error in updateStore:", error);
    return ApiError(res, 500, "Internal Server Error");
  }
};