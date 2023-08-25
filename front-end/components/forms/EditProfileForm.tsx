import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  GetUserProfileDocument,
  GetUserProfileQuery,
  useEditProfileMutation,
} from "@/codegen/graphql";
import { generateErrorMap } from "@/utils/generateErrorMap";
import { useRouter } from "next/navigation";

type EditProfileFormProps = {
  avatar: string;
  banner: string;
  bio: string;
  displayName: string;
  username: string;
};

function EditProfileForm({
  avatar,
  banner,
  bio,
  displayName,
  username,
}: EditProfileFormProps) {
  const router = useRouter();
  const [editProfile] = useEditProfileMutation();

  const formik = useFormik({
    initialValues: {
      avatar,
      banner,
      bio,
      displayName,
    },
    validationSchema: Yup.object({
      avatar: Yup.string()
        .max(500, "That URL is too long. Try a shorter one.")
        .required("Required"),
      banner: Yup.string()
        .max(500, "That URL is too long. Try a shorter one.")
        .required("Required"),
      bio: Yup.string().max(
        500,
        "Your bio can only be 500 up to characters long."
      ),
      displayName: Yup.string()
        .max(30, "Display names can only be up to 30 characters long.")
        .required("Required"),
    }),
    onSubmit: async (values, { setErrors }) => {
      //Check for changes before executing mutation
      if (
        values.avatar === avatar &&
        values.banner === banner &&
        values.bio === bio &&
        values.displayName === displayName
      )
        return;

      const res = await editProfile({
        variables: {
          avatar: values.avatar,
          banner: values.banner,
          bio: values.bio,
          displayName: values.displayName,
        },
        update: (cache, { data }) => {
          if (data?.editProfile.errors) return;

          //Update profile
          const userProfile = cache.readQuery<GetUserProfileQuery>({
            query: GetUserProfileDocument,
            variables: {
              username,
            },
          });

          cache.writeQuery<GetUserProfileQuery>({
            query: GetUserProfileDocument,
            data: {
              __typename: "Query",
              userByUsername: {
                __typename: "User",
                ...userProfile?.userByUsername!,
                avatar: values.avatar,
                banner: values.banner,
                bio: values.bio,
                displayName: values.displayName,
              },
            },
            variables: {
              username,
            },
          });
        },
      });

      if (res.data?.editProfile.errors) {
        setErrors(generateErrorMap(res.data.editProfile.errors));
      } else if (res.data?.editProfile.changed) {
        console.log(
          `%c[DEBUG] Successfully updated user profile: ${username}`,
          "color: limegreen"
        );
        router.push(`/p/${username}`);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <label className="pb-1 font-semibold text-sm text-zinc-800 dark:text-zinc-100 block">
        Display Name
      </label>
      <input
        id="displayName"
        name="displayName"
        type="text"
        placeholder="John Doe"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.displayName}
        className="border rounded px-3 py-2 mt-1 mb-5 text-sm w-full dark:bg-zinc-500 dark:placeholder:text-zinc-300"
      />
      {formik.touched.displayName && formik.errors.displayName ? (
        <div className="text-sm -mt-4 mb-4 text-red-600 dark:text-red-400">
          {formik.errors.displayName}
        </div>
      ) : null}
      <label className="pb-1 font-semibold text-sm text-zinc-800 dark:text-zinc-100 block">
        Bio
      </label>
      <textarea
        id="bio"
        name="bio"
        rows={3}
        placeholder=""
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.bio}
        className="border rounded px-3 py-2 mt-1 mb-5 text-sm w-full dark:bg-zinc-500 dark:placeholder:text-zinc-300"
      />
      {formik.touched.bio && formik.errors.bio ? (
        <div className="text-sm -mt-4 mb-4 text-red-600 dark:text-red-400">
          {formik.errors.bio}
        </div>
      ) : null}
      <label className="pb-1 font-semibold text-sm text-zinc-800 dark:text-zinc-100 block">
        Avatar URL
      </label>
      <input
        id="avatar"
        name="avatar"
        type="text"
        placeholder="http://example.com/avatar.png"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.avatar}
        className="border rounded px-3 py-2 mt-1 mb-5 text-sm w-full dark:bg-zinc-500 dark:placeholder:text-zinc-300"
      />
      {formik.touched.avatar && formik.errors.avatar ? (
        <div className="text-sm -mt-4 mb-4 text-red-600 dark:text-red-400">
          {formik.errors.avatar}
        </div>
      ) : null}
      <label className="pb-1 font-semibold text-sm text-zinc-800 dark:text-zinc-100 block">
        Banner URL
      </label>
      <input
        id="banner"
        name="banner"
        type="text"
        placeholder="http://example.com/banner.png"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.banner}
        className="border rounded px-3 py-2 mt-1 mb-5 text-sm w-full dark:bg-zinc-500 dark:placeholder:text-zinc-300"
      />
      {formik.touched.banner && formik.errors.banner ? (
        <div className="text-sm -mt-4 mb-4 text-red-600 dark:text-red-400">
          {formik.errors.banner}
        </div>
      ) : null}
      <button
        type="submit"
        disabled={formik.isSubmitting}
        className="px-3 py-2 w-full rounded text-sm font-semibold bg-blue-500 dark:bg-blue-700 hover:bg-blue-600 hover:shadow-sm focus:ring-2 focus:ring-blue-400 focus:dark:ring-blue-800 transition duration-300"
      >
        Submit
      </button>
    </form>
  );
}

export default EditProfileForm;
