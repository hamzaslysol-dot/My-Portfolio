import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export interface Blog {
  id: number;
  title: string;
  author: string;
  content?: string;
  image?: string;
  createdAt: string;
}

// ✅ Fetch all blogs
export const useBlogs = () => {
  return useQuery<Blog[], Error>({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:8000/api/blogs");
      return res.data;
    },
  });
};

// ✅ Fetch single blog
export const useBlog = (id?: string) => {
  return useQuery<Blog, Error>({
    queryKey: ["blog", id],
    queryFn: async () => {
      if (!id) throw new Error("No blog ID");
      const res = await axios.get(`http://localhost:8000/api/blogs/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
};

// ✅ Add a blog
export const useAddBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: FormData) => {
      await axios.post("http://localhost:8000/api/blogs", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["blogs"] }),
  });
};

// ✅ Edit a blog
export const useEditBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      formData,
    }: {
      id: string;
      formData: FormData;
    }) => {
      await axios.put(`http://localhost:8000/api/blogs/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["blogs"] }),
  });
};

// ✅ Delete a blog
export const useDeleteBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(`http://localhost:8000/api/blogs/${id}`);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["blogs"] }),
  });
};
