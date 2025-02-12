import classNames from "classnames";

import { useForm } from "react-hook-form";

import visible_on from "../../assets/icon/visible_on.svg";
import visible_off from "../../assets/icon/visible_off.svg";
import login_id from "../../assets/icon/login_id.svg";
import login_pw from "../../assets/icon/login_pw.svg";
import login_id_focus from "../../assets/icon/login_id_focus.svg";
import login_pw_focus from "../../assets/icon/login_pw_focus.svg";

import { LoginType } from "../../../@types";
import { useState } from "react";

import ax from "../../util/api";

import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store";
import { login } from "../../store/reducer";

const LoginPage = () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState<Boolean>(false);
    const [isIdFocus, setIsIdFocus] = useState<Boolean>(false);
    const [isPwFocus, setIsPwFocus] = useState<Boolean>(false);

    const [errMsg, setErrMsg] = useState<String>("");

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isSubmitted, isSubmitting },
    } = useForm<LoginType>({
        mode: "onSubmit",
    });

    const onSubmit = (data: LoginType) => {
        reset();
        if (isSubmitting || isSubmitted) return;

        const { userId, userPw } = data;

        ax.post("/login", {
            email: userId,
            pw: userPw,
        }).then((res) => {
            alert("로그인 성공");
            localStorage.setItem("accessToken", res.data.accessToken);
            localStorage.setItem("refreshToken", res.data.refreshToken);

            dispatch(login())
            navigate("/");
        }).catch((err) => {
            setErrMsg(err.response.data.message);
        })
    }

    return (
        <div
            className={classNames(
                "container",
                "flex",
                "flex-col",
                "justify-center",
                "items-center"
            )}
        >
            <div
                className={classNames(
                    "mb-12",

                    "text-5xl",
                    "text-center",
                    "font-bold"
                )}
            >
                더 쉬운 폼을 위한 시작 <br />
                폼나는싸패
            </div>

            <form className={classNames("w-1/3")} onSubmit={handleSubmit(onSubmit)}>
                <div className="relative mb-4">
                    <div>
                        <img src={isIdFocus ? login_id_focus : login_id} alt="아이디" className={classNames(
                            "absolute",

                            "top-1/2",
                            "left-4",

                            "translate-y-[-50%]"
                        )} />
                    </div>
                    <input
                        id="userId"
                        type="email"
                        className={classNames(
                            "w-full",

                            "py-4",
                            "pl-12",

                            "border-2",
                            "border-neutral-300",
                            "rounded-full",

                            "focus:border-[#6ED1F9]",
                            "focus:outline-none"
                        )}
                        {...register("userId", {
                            required: "아이디를 입력해주세요",
                        })}
                        onFocus={() => setIsIdFocus(true)} onBlur={() => setIsIdFocus(false)}
                        placeholder="아이디"
                    />
                </div>

                <div className="relative mb-4">
                    <div>
                        <img src={isPwFocus ? login_pw_focus : login_pw} alt="비밀번호" className={classNames(
                            "absolute",

                            "top-1/2",
                            "left-4",

                            "translate-y-[-50%]",

                        )} />
                    </div>
                    <input
                        id="userPw"
                        placeholder="비밀번호"
                        type={isPasswordVisible ? "text" : "password"}
                        className={classNames(
                            "w-full",

                            "py-4",
                            "px-12",

                            "border-2",
                            "border-neutral-300",

                            "rounded-full",

                            "focus:border-[#6ED1F9]",
                            "focus:outline-none"
                        )}
                        {...register("userPw", {
                            required: "비밀번호를 입력해주세요",
                        })}
                        onFocus={() => setIsPwFocus(true)} onBlur={() => setIsPwFocus(false)}
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
                {errors && (
                    <div
                        className={classNames(
                            'my-4',
                            "text-[#F93F3F]",
                            "text-sm"
                        )}
                    >
                        {errMsg ? errMsg : errors.userId?.message || errors.userPw?.message}
                    </div>

                )}
                <input
                    type="submit"
                    className={classNames(
                        "w-full",

                        "mt-6",
                        "py-4",

                        "flex",
                        "justify-center",
                        "items-center",

                        "rounded-full",

                        watch("userId") &&
                            watch("userPw") &&
                            !errors.userId &&
                            !errors.userPw
                            ? "bg-theme cursor-pointer hover:bg-opacity-80"
                            : "bg-[#d4d4d4]",

                        "font-bold",
                        "text-white"
                    )}
                    value={"로그인"}
                />
            </form>
        </div>
    );
}

export default LoginPage