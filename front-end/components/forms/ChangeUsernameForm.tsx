import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import {
  CurrentUserDocument,
  CurrentUserQuery,
  useChangeUsernameMutation,
} from "@/codegen/graphql";
import { generateErrorMap } from "@/utils/generateErrorMap";

type ChangeUsernameFormProps = {
  username: string;
};

function ChangeUsernameForm({ username }: ChangeUsernameFormProps) {
  const router = useRouter();
  const [changeUsername] = useChangeUsernameMutation();

  const formik = useFormik({
    initialValues: {
      newUsername: username,
      password: "",
    },
    validationSchema: Yup.object({
      newUsername: Yup.string()
        .max(30, "Display names can only be up to 30 characters long.")
        .required("Required"),
    }),
    onSubmit: async (values, { setErrors }) => {
      if (values.newUsername === username) return;

      const res = await changeUsername({
        variables: {
          newUsername: values.newUsername,
          password: values.password,
        },
        update: (cache, { data }) => {
          if (data?.changeUsername.errors) return;

          //Update CurrentUser cache
          const user = cache.readQuery<CurrentUserQuery>({
            query: CurrentUserDocument,
          });

          cache.writeQuery<CurrentUserQuery>({
            query: CurrentUserDocument,
            data: {
              __typename: "Query",
              currentUser: {
                __typename: "User",
                ...user?.currentUser!,
                username: values.newUsername,
              },
            },
          });
        },
      });

      if (res.data?.changeUsername.errors) {
        setErrors(generateErrorMap(res.data.changeUsername.errors));
      } else if (res.data?.changeUsername.changed) {
        formik.resetForm();
        console.log(
          `%c[DEBUG] Successfully updated user profile: ${values.newUsername}`,
          "color: limegreen"
        );
        router.push(`/settings`);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <label className="pb-1 font-semibold text-sm text-zinc-800 dark:text-zinc-100 block">
        New Username
      </label>
      <input
        id="newUsername"
        name="newUsername"
        type="text"
        placeholder="johnnydoe52"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.newUsername}
        className="border rounded px-3 py-2 mt-1 mb-5 text-sm w-full dark:bg-zinc-500 dark:placeholder:text-zinc-300"
      />
      {formik.touched.newUsername && formik.errors.newUsername ? (
        <div className="text-sm -mt-4 mb-4 text-red-600 dark:text-red-400">
          {formik.errors.newUsername}
        </div>
      ) : null}
      <label className="pb-1 font-semibold text-sm text-zinc-800 dark:text-zinc-100 block">
        Password
      </label>
      <input
        id="password"
        name="password"
        type="password"
        placeholder="************"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
        className="border rounded px-3 py-2 mt-1 mb-5 text-sm w-full dark:bg-zinc-500 dark:placeholder:text-zinc-300"
      />
      {formik.touched.password && formik.errors.password ? (
        <div className="text-sm -mt-4 mb-4 text-red-600 dark:text-red-400">
          {formik.errors.password}
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

export default ChangeUsernameForm;
