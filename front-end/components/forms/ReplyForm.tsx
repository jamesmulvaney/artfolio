import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  GetPostDocument,
  GetPostQuery,
  useCreateReplyMutation,
} from "@/codegen/graphql";
import { generateErrorMap } from "@/utils/generateErrorMap";

type ReplyFormProps = {
  postId: number;
};

function ReplyForm({ postId }: ReplyFormProps) {
  const [reply] = useCreateReplyMutation();

  const formik = useFormik({
    initialValues: {
      postId,
      message: "",
    },
    validationSchema: Yup.object({
      message: Yup.string()
        .max(300, "Maximum reply length of 300 characters.")
        .required("Required"),
    }),
    onSubmit: async (values, { setErrors }) => {
      const res = await reply({
        variables: {
          pid: values.postId,
          text: values.message,
        },
        update: (cache, { data }) => {
          if (!data?.createReply.reply) return;

          //Add reply to cache
          const existingReplies = cache.readQuery<GetPostQuery>({
            query: GetPostDocument,
            variables: {
              id: postId,
            },
          });

          cache.writeQuery<GetPostQuery>({
            query: GetPostDocument,
            data: {
              __typename: "Query",
              post: {
                ...existingReplies!.post!,
                replies: [
                  ...existingReplies!.post?.replies!,
                  data.createReply.reply!,
                ],
                replyCount: existingReplies?.post?.replyCount! + 1,
              },
            },
          });
        },
      });

      if (res.data?.createReply.errors) {
        setErrors(generateErrorMap(res.data.createReply.errors));
      } else if (res.data?.createReply.reply) {
        console.log(
          `%c[DEBUG] Successfully created reply with ID '${res.data.createReply.reply.id}' to post with ID '${postId}'`,
          "color: limegreen"
        );
      }

      formik.resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <label className="pb-1 font-semibold text-sm text-zinc-800 dark:text-zinc-100 block">
        Reply
      </label>
      <textarea
        id="message"
        name="message"
        placeholder="Type your reply here..."
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.message}
        className="border rounded px-3 py-2 mt-1 mb-5 text-sm w-full dark:bg-zinc-500 dark:placeholder:text-zinc-300"
      />
      {formik.touched.message && formik.errors.message ? (
        <div className="text-sm -mt-4 mb-4 text-red-600 dark:text-red-400">
          {formik.errors.message}
        </div>
      ) : null}
      <button
        type="submit"
        disabled={formik.isSubmitting}
        className="px-3 py-2 w-full rounded text-sm font-semibold bg-blue-500 dark:bg-blue-700 hover:bg-blue-600 hover:shadow-sm focus:ring-2 focus:ring-blue-400 focus:dark:ring-blue-800 transition duration-300"
      >
        Reply
      </button>
    </form>
  );
}

export default ReplyForm;
