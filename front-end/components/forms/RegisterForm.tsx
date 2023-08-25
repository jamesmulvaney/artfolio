import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import {
  CurrentUserDocument,
  CurrentUserQuery,
  useRegisterMutation,
} from "@/codegen/graphql";
import { generateErrorMap } from "@/utils/generateErrorMap";

type RegisterFormProps = {};

function RegisterForm({}: RegisterFormProps) {
  const router = useRouter();
  const [register] = useRegisterMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      displayName: "",
      dateOfBirth: "1970-01-01",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Required"),
      username: Yup.string()
        .max(30, "Usernames can only be up to 30 characters long.")
        .required("Required"),
      displayName: Yup.string()
        .max(30, "Display names can only be up to 30 characters long.")
        .required("Required"),
      dateOfBirth: Yup.string().required("Required"),
      password: Yup.string()
        .min(12, "Your password must be at least 12 characters long.")
        .required("Required"),
    }),
    onSubmit: async (values, { setErrors }) => {
      const res = await register({
        variables: { options: values },
        update: (cache, { data }) => {
          cache.writeQuery<CurrentUserQuery>({
            query: CurrentUserDocument,
            data: {
              __typename: "Query",
              currentUser: data?.register.user,
            },
          });
        },
      });

      if (res.data?.register.errors) {
        setErrors(generateErrorMap(res.data.register.errors));
      } else if (res.data?.register.user) {
        console.log(
          `%c[DEBUG] Successful Register: ${res.data.register.user.username}`,
          "color: limegreen"
        );
        router.push("/");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <label className="pb-1 font-semibold text-sm text-zinc-800 dark:text-zinc-100 block">
        Email
      </label>
      <input
        id="email"
        name="email"
        type="email"
        placeholder="john.doe@example.com"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
        className="border rounded px-3 py-2 mt-1 mb-5 text-sm w-full dark:bg-zinc-500 dark:placeholder:text-zinc-300"
      />
      {formik.touched.email && formik.errors.email ? (
        <div className="text-sm -mt-4 mb-4 text-red-600 dark:text-red-400">
          {formik.errors.email}
        </div>
      ) : null}
      <label className="pb-1 font-semibold text-sm text-zinc-800 dark:text-zinc-100 block">
        Username
      </label>
      <input
        id="username"
        name="username"
        type="text"
        placeholder="johnnydoe52"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.username}
        className="border rounded px-3 py-2 mt-1 mb-5 text-sm w-full dark:bg-zinc-500 dark:placeholder:text-zinc-300"
      />
      {formik.touched.username && formik.errors.username ? (
        <div className="text-sm -mt-4 mb-4 text-red-600 dark:text-red-400">
          {formik.errors.username}
        </div>
      ) : null}
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
        Date of Birth
      </label>
      <input
        id="dateOfBirth"
        name="dateOfBirth"
        type="date"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.dateOfBirth}
        className="border rounded px-3 py-2 mt-1 mb-5 text-sm w-full dark:bg-zinc-500 dark:placeholder:text-zinc-300"
      />
      {formik.touched.dateOfBirth && formik.errors.dateOfBirth ? (
        <div className="text-sm -mt-4 mb-4 text-red-600 dark:text-red-400">
          {formik.errors.dateOfBirth}
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
        Register
      </button>
    </form>
  );
}

export default RegisterForm;
