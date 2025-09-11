import prisma from "../../../db/db.js";
import ApiError from "../../../utils/ApiError.js";
import ApiResponse from "../../../utils/ApiResponse.js";

export const getStores = async (req, res) => {
  try {
    const userId = req.user.id;

    const stores = await prisma.store.findMany({
      where: {
        OR: [
          { ownerId: userId },
          { members: { some: { id: userId } } }
        ],
        isDeleted: false
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

    return ApiResponse(res, 200, stores, "Stores fetched successfully");
  } catch (error) {
    console.error("Error in getStores:", error);
    return ApiError(res, 500, "Internal Server Error");
  }
};

// Get single store by ID
export const getStoreById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const store = await prisma.store.findFirst({
      where: {
        id: Number(id),
        OR: [
          { ownerId: userId },
          { members: { some: { id: userId } } }
        ],
        isDeleted: false
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

    if (!store) {
      return ApiError(res, 404, "Store not found");
    }

    return ApiResponse(res, 200, store, "Store fetched successfully");
  } catch (error) {
    console.error("Error in getStoreById:", error);
    return ApiError(res, 500, "Internal Server Error");
  }
};