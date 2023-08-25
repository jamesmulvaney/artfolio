import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useChangePasswordMutation } from "@/codegen/graphql";
import { generateErrorMap } from "@/utils/generateErrorMap";

type ChangePasswordFormProps = {};

function ChangePasswordForm({}: ChangePasswordFormProps) {
  const router = useRouter();
  const [changePassword] = useChangePasswordMutation();

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string().required("Required"),
      newPassword: Yup.string()
        .min(12, "Your password must be at least 12 characters long.")
        .required("Required"),
      confirmPassword: Yup.string().required("Required"),
    }),
    onSubmit: async (values, { setErrors }) => {
      if (values.newPassword !== values.confirmPassword) {
        formik.errors.confirmPassword = "Password does not match.";
        return;
      }

      const res = await changePassword({
        variables: {
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
        },
      });

      if (res.data?.changePassword.errors) {
        setErrors(generateErrorMap(res.data.changePassword.errors));
      } else if (res.data?.changePassword.changed) {
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
        Old Password
      </label>
      <input
        id="oldPassword"
        name="oldPassword"
        type="password"
        placeholder="************"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.oldPassword}
        className="border rounded px-3 py-2 mt-1 mb-5 text-sm w-full dark:bg-zinc-500 dark:placeholder:text-zinc-300"
      />
      {formik.touched.oldPassword && formik.errors.oldPassword ? (
        <div className="text-sm -mt-4 mb-4 text-red-600 dark:text-red-400">
          {formik.errors.oldPassword}
        </div>
      ) : null}
      <label className="pb-1 font-semibold text-sm text-zinc-800 dark:text-zinc-100 block">
        New Password
      </label>
      <input
        id="newPassword"
        name="newPassword"
        type="password"
        placeholder="************"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.newPassword}
        className="border rounded px-3 py-2 mt-1 mb-5 text-sm w-full dark:bg-zinc-500 dark:placeholder:text-zinc-300"
      />
      {formik.touched.newPassword && formik.errors.newPassword ? (
        <div className="text-sm -mt-4 mb-4 text-red-600 dark:text-red-400">
          {formik.errors.newPassword}
        </div>
      ) : null}
      <label className="pb-1 font-semibold text-sm text-zinc-800 dark:text-zinc-100 block">
        Confirm New Password
      </label>
      <input
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        placeholder="************"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.confirmPassword}
        className="border rounded px-3 py-2 mt-1 mb-5 text-sm w-full dark:bg-zinc-500 dark:placeholder:text-zinc-300"
      />
      {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
        <div className="text-sm -mt-4 mb-4 text-red-600 dark:text-red-400">
          {formik.errors.confirmPassword}
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

export default ChangePasswordForm;
