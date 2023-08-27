import React from "react";
import { useFormik } from "formik";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";

type SearchFormProps = {};

function SearchForm({}: SearchFormProps) {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      query: "",
    },
    onSubmit: (values) => {
      console.log(values);
      if (values.query.length === 0) {
        formik.resetForm();
      } else {
        router.push(`/search?q=${values.query}`);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="hidden sm:block">
      <div className="inline-flex">
        <div>
          <input
            id="query"
            name="query"
            type="text"
            placeholder="Search..."
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.query}
            className="border rounded px-3 py-2 text-sm w-full dark:bg-zinc-500 dark:placeholder:text-zinc-300"
          />
          {formik.touched.query && formik.errors.query ? (
            <div className="text-sm text-red-600 dark:text-red-400">
              {formik.errors.query}
            </div>
          ) : null}
        </div>
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="ml-2 px-3 py-2 rounded text-sm font-semibold bg-blue-500 dark:bg-blue-700 hover:bg-blue-600 hover:shadow-sm focus:ring-2 focus:ring-blue-400 focus:dark:ring-blue-800 transition duration-300"
        >
          <FaSearch />
        </button>
      </div>
    </form>
  );
}

export default SearchForm;
