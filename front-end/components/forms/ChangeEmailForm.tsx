import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import {
  CurrentUserDocument,
  CurrentUserQuery,
  useChangeEmailMutation,
} from "@/codegen/graphql";
import { generateErrorMap } from "@/utils/generateErrorMap";

type ChangeEmailFormProps = {
  email: string;
};

function ChangeEmailForm({ email }: ChangeEmailFormProps) {
  const router = useRouter();
  const [changeEmail] = useChangeEmailMutation();

  const formik = useFormik({
    initialValues: {
      newEmail: email,
      password: "",
    },
    validationSchema: Yup.object({
      newEmail: Yup.string().email().required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values, { setErrors }) => {
      if (values.newEmail === email) return;

      const res = await changeEmail({
        variables: {
          newEmail: values.newEmail,
          password: values.password,
        },
        update: (cache, { data }) => {
          if (data?.changeEmail.errors) return;

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
                username: values.newEmail,
              },
            },
          });
        },
      });

      if (res.data?.changeEmail.errors) {
        setErrors(generateErrorMap(res.data.changeEmail.errors));
      } else if (res.data?.changeEmail.changed) {
        formik.resetForm();
        console.log(
          `%c[DEBUG] Successfully updated user profile`,
          "color: limegreen"
        );
        router.push(`/settings`);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <label className="pb-1 font-semibold text-sm text-zinc-800 dark:text-zinc-100 block">
        New Email
      </label>
      <input
        id="newEmail"
        name="newEmail"
        type="email"
        placeholder="john.doe@example.com"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.newEmail}
        className="border rounded px-3 py-2 mt-1 mb-5 text-sm w-full dark:bg-zinc-500 dark:placeholder:text-zinc-300"
      />
      {formik.touched.newEmail && formik.errors.newEmail ? (
        <div className="text-sm -mt-4 mb-4 text-red-600 dark:text-red-400">
          {formik.errors.newEmail}
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

export default ChangeEmailForm;
