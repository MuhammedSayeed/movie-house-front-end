import * as yup from "yup";

const name = yup
    .string()
    .required("Name is required")
    .min(3, "name must be at least 3 characters long")
    .max(32, "name must be at most 32 characters long")
const emailValidation = yup
    .string()
    .email("Invalid email format")
    .required("Email is required");
const passwordValidation = yup
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(32, "Password must be at most 32 characters long")
    .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one lowercase letter, one uppercase letter, and one digit."
    )
    .required("Password is required");


// Login schema
export const loginSchema = yup.object({
    email: emailValidation,
    password: passwordValidation,
});

// Signup schema
export const signupSchema = yup.object({
    name: name,
    email: emailValidation,
    password: passwordValidation,
});


// Edit Name schema
export const editNameSchema = yup.object({
    name: yup.string().required("Name is required"),
    password: yup.string().when("$authType", {
        is: (authType: string) => authType !== "google", 
        then: () => passwordValidation, 
        otherwise: () => yup.string().notRequired(),
    }),
});

// Edit Email schema
export const editEmailSchema = yup.object({
    email: emailValidation,
    password: passwordValidation,
});

// Edit Password schema
export const editPasswordSchema = yup.object({
    password: passwordValidation,
    newpassword : passwordValidation
});