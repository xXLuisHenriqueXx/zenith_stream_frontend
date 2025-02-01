import { api } from "@services/api";
import { createMovieSchema, updateMovieSchema } from "@schemas/movieSchema";
import { z } from "zod";

type createMovieParams = z.input<typeof createMovieSchema>;
type updateMovieParams = z.input<typeof updateMovieSchema>;

export const movieService = {
    getAll: async () => {
        try {
            const response = await api.get("/movie");
            
            return response;

        } catch (error: any) {
            throw new Error(error);
        }
    },

    create: async (params: createMovieParams) => {
        try {
            const response = await api.post("/movie", params);
            
            return response;

        } catch (error: any) {
            throw new Error(error);
        }
    },

    update: async (params: updateMovieParams) => {
        try {
            const response = await api.put(`/movie/${params.id}`, params);
            
            return response;

        } catch (error: any) {
            throw new Error(error);
        }
    },

    delete: async (id: string) => {
        try {
            const response = await api.delete(`/movie/${id}`);
            
            return response;
            
        } catch (error: any) {
            throw new Error(error);
        }
    }
};