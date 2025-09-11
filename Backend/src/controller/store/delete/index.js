import prisma from "../../../db/db.js";
import ApiError from "../../../utils/ApiError.js";
import ApiResponse from "../../../utils/ApiResponse.js";

export const deleteStore = async (req, res) => {
  try {
    const { id } = req.params;
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
      return ApiError(res, 404, "Store not found or you don't have permission to delete");
    }

    // Soft delete the store
    const deletedStore = await prisma.store.update({
      where: {
        id: Number(id)
      },
      data: {
        isDeleted: true
      }
    });

    return ApiResponse(res, 200, deletedStore, "Store deleted successfully");
  } catch (error) {
    console.error("Error in deleteStore:", error);
    return ApiError(res, 500, "Internal Server Error");
  }
};