import React from "react";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import {
  CurrentUserDocument,
  CurrentUserQuery,
  useLoginMutation,
} from "@/codegen/graphql";
import { useFormik } from "formik";
import { generateErrorMap } from "@/utils/generateErrorMap";

type LoginFormProps = {};

function LoginForm({}: LoginFormProps) {
  const router = useRouter();
  const [login] = useLoginMutation();

  const formik = useFormik({
    initialValues: {
      usernameEmail: "",
      password: "",
    },
    validationSchema: Yup.object({
      usernameEmail: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values, { setErrors }) => {
      const res = await login({
        variables: values,
        update: (cache, { data }) => {
          cache.writeQuery<CurrentUserQuery>({
            query: CurrentUserDocument,
            data: {
              __typename: "Query",
              currentUser: data?.login.user,
            },
          });
        },
      });

      if (res.data?.login.errors) {
        setErrors(generateErrorMap(res.data.login.errors));
      } else if (res.data?.login.user) {
        console.log(
          `%c[DEBUG] Successful Login: ${res.data.login.user.username}`,
          "color: limegreen"
        );
        router.push("/");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <label className="pb-1 font-semibold text-sm text-zinc-800 dark:text-zinc-100 block">
        Username / Email
      </label>
      <input
        id="usernameEmail"
        name="usernameEmail"
        type="text"
        placeholder="Enter your username or email..."
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.usernameEmail}
        className="border rounded px-3 py-2 mt-1 mb-5 text-sm w-full dark:bg-zinc-500 dark:placeholder:text-zinc-300"
      />
      {formik.touched.usernameEmail && formik.errors.usernameEmail ? (
        <div className="text-sm -mt-4 mb-4 text-red-600 dark:text-red-400">
          {formik.errors.usernameEmail}
        </div>
      ) : null}
      <label className="pb-1 font-semibold text-sm text-zinc-800 dark:text-zinc-100 block">
        Password
      </label>
      <input
        id="password"
        name="password"
        type="password"
        placeholder="***********"
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
        Login
      </button>
    </form>
  );
}

export default LoginForm;
