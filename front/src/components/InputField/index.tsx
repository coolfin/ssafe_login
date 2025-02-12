import { useState } from "react";

import visible_on from "../../assets/icon/visible_on.svg";
import visible_off from "../../assets/icon/visible_off.svg";

import { InputFieldType } from "../../../@types";

import {
  CONFIRM_PASSWORD_MESSAGE,
  EMAIL_MESSAGE,
  PASSWORD_MESSAGE,
} from "../../constants/messages";
import classNames from "classnames";
import { EMAIL_REGEX, PASSWORD_REGEX } from "../../constants/regexr";

export const InputField = ({
  label,
  type,
  register,
  errors,
  ...rest
}: InputFieldType) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<Boolean>(false);
  const [isPasswordConfirmVisible, setIsPasswordConfirmVisible] =
    useState<Boolean>(false);

  if (type === "password") {
    return (
      <div className={classNames("mb-4")}>
        <label
          htmlFor="signUpPw"
          className={classNames(
            "px-4",
            "mb-2",

            "flex",

            "font-bold",
            "text-neutral-600"
          )}
        >
          {label}
        </label>
        <div className="relative">
          <input
            id="signUpPw"
            type={isPasswordVisible ? "text" : "password"}
            className={classNames(
              "w-full",

              "p-4",

              "border-2",
              "border-neutral-300",

              "rounded-full",

              "focus:border-[#6ED1F9]",
              "focus:outline-none"
            )}
            {...register("password", {
              required: true,
              pattern: {
                value: PASSWORD_REGEX,
                message: PASSWORD_MESSAGE,
              },
            })}
          />

          <div
            className={classNames(
              "absolute",

              "top-1/2",
              "right-4",

              "translate-y-[-50%]",

              "cursor-pointer"
            )}
            onClick={() => {
              setIsPasswordVisible(!isPasswordVisible);
            }}
          >
            <img
              src={isPasswordVisible ? visible_on : visible_off}
              alt="비밀번호 표시"
              className="w-5"
            />
          </div>
        </div>

        <div
          className={classNames(
            "px-4",
            "py-2",

            "text-[#F93F3F]",
            "text-sm",
            "font-semibold"
          )}
        >
          {errors.password && errors.password.message} &nbsp;
        </div>
      </div>
    );
  } else if (type === "passwordConfirm") {
    return (
      <div className="relative">
        <label
          htmlFor="signupPwConfirm"
          className={classNames(
            "px-4",
            "mb-2",

            "flex",

            "font-bold",
            "text-neutral-600"
          )}
        >
          {label}
        </label>
        <div>
          <input
            id="signupPwConfirm"
            type={isPasswordConfirmVisible ? "text" : "password"}
            className={classNames(
              "w-full",

              "p-4",

              "border-2",
              "border-neutral-300",

              "rounded-full",

              "focus:border-[#6ED1F9]",
              "focus:outline-none"
            )}
            {...register("passwordConfirm", {
              required: true,
              validate: (v: string) =>
                v === (rest.watch && rest.watch("password")) ||
                CONFIRM_PASSWORD_MESSAGE,
            })}
          />
          <div
            className={classNames(
              "absolute",

              "top-1/2",
              "right-4",

              "translate-y-[-50%]",

              "cursor-pointer"
            )}
            onClick={() => {
              setIsPasswordConfirmVisible(!isPasswordConfirmVisible);
            }}
          >
            <img
              src={isPasswordConfirmVisible ? visible_on : visible_off}
              alt="비밀번호 표시"
              className="w-5"
            />
          </div>
        </div>

        <div
          className={classNames(
            "px-4",
            "py-2",

            "text-[#F93F3F]",
            "text-sm",
            "font-semibold"
          )}
        >
          {errors.passwordConfirm && errors.passwordConfirm.message} &nbsp;
        </div>
      </div>
    );
  }

  return (
    <div className={classNames("mb-4")}>
      <label
        htmlFor="signUpEmail"
        className={classNames(
          "px-4",
          "mb-2",

          "flex",

          "font-bold",
          "text-neutral-600"
        )}
      >
        {label}
      </label>

      <div>
        <input
          id="signUpEmail"
          type={type}
          className={classNames(
            "w-full",

            "py-4",
            "pl-4",
            "pr-8",

            "border-2",
            "border-neutral-300",
            "rounded-full",

            "focus:border-[#6ED1F9]",
            "focus:outline-none"
          )}
          placeholder="ssafe11@gmail.com"
          {...register("email", {
            required: true,
            pattern: {
              value: EMAIL_REGEX,
              message: EMAIL_MESSAGE,
            },
          })}
        />
      </div>

      <div
        className={classNames(
          "px-4",
          "py-2",

          "text-[#F93F3F]",
          "text-sm",
          "font-semibold"
        )}
      >
        {errors.email && errors.email.message} &nbsp;
      </div>
    </div>
  );
};
