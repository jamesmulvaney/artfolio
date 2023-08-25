import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useCreatePostMutation } from "@/codegen/graphql";
import { useRouter } from "next/navigation";
import { generateErrorMap } from "@/utils/generateErrorMap";

type CreatePostFormProps = {
  username: string;
};

function CreatePostForm({ username }: CreatePostFormProps) {
  const [createPost] = useCreatePostMutation();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      title: "",
      image: "",
      description: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Required"),
      image: Yup.string().required("Required"),
      description: Yup.string()
        .max(500, "Posts can only have a maximum of 500 characters.")
        .required("Required"),
    }),
    onSubmit: async (values, { setErrors }) => {
      const res = await createPost({
        variables: {
          options: values,
        },
      });

      if (res.data?.createPost.errors) {
        setErrors(generateErrorMap(res.data.createPost.errors));
      } else if (res.data?.createPost.post) {
        console.log(
          `%c[DEBUG] Successfully created post: ${res.data.createPost.post.id}`,
          "color: limegreen"
        );
        router.push(`/p/${username}/posts/${res.data.createPost.post.id}`);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <label className="pb-1 font-semibold text-sm text-zinc-800 dark:text-zinc-100 block">
        Title
      </label>
      <input
        id="title"
        name="title"
        type="text"
        placeholder="Enter a captivating title here..."
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.title}
        className="border rounded px-3 py-2 mt-1 mb-5 text-sm w-full dark:bg-zinc-500 dark:placeholder:text-zinc-300"
      />
      {formik.touched.title && formik.errors.title ? (
        <div className="text-sm -mt-4 mb-4 text-red-600 dark:text-red-400">
          {formik.errors.title}
        </div>
      ) : null}
      <label className="pb-1 font-semibold text-sm text-zinc-800 dark:text-zinc-100 block">
        Image Link
      </label>
      <input
        id="image"
        name="image"
        type="text"
        placeholder="https://example.com/image.png"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.image}
        className="border rounded px-3 py-2 mt-1 mb-5 text-sm w-full dark:bg-zinc-500 dark:placeholder:text-zinc-300"
      />
      {formik.touched.image && formik.errors.image ? (
        <div className="text-sm -mt-4 mb-4 text-red-600 dark:text-red-400">
          {formik.errors.image}
        </div>
      ) : null}
      <label className="pb-1 font-semibold text-sm text-zinc-800 dark:text-zinc-100 block">
        Description
      </label>
      <textarea
        id="description"
        name="description"
        placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt ipsa, mollitia beatae fuga reprehenderit voluptatum atque."
        rows={3}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.description}
        className="border rounded px-3 py-2 mt-1 mb-5 text-sm w-full dark:bg-zinc-500 dark:placeholder:text-zinc-300"
      />
      {formik.touched.description && formik.errors.description ? (
        <div className="text-sm -mt-4 mb-4 text-red-600 dark:text-red-400">
          {formik.errors.description}
        </div>
      ) : null}
      <button
        type="submit"
        disabled={formik.isSubmitting}
        className="px-3 py-2 w-full rounded text-sm font-semibold bg-blue-500 dark:bg-blue-700 hover:bg-blue-600 hover:shadow-sm focus:ring-2 focus:ring-blue-400 focus:dark:ring-blue-800 transition duration-300"
      >
        Publish
      </button>
    </form>
  );
}

export default CreatePostForm;
