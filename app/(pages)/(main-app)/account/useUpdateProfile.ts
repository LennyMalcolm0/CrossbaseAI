import { Profile } from "@/app/models";
import { getCurrentUser } from "@/app/utils/auth";
import { HttpClient } from "@/app/utils/axiosRequests";
import { useAsyncEffect, useRequest } from "ahooks";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as yup from "yup";

export const profileSchema = yup.object().shape({
    firstName: yup.string().trim().required("First name is required"),
    lastName: yup.string().trim().required("Last name is required"),
    phoneNumber: yup.string().trim().optional(),
});

function useUpdateProfile() {
    const [profile, setProfile] = useState<Profile>();
    const [update, setUpdate] = useState(false);
    const [saving, setSaving] = useState(false);
    const [emailAddress, setEmailAddress] = useState("");

    useAsyncEffect(async() => {
        const user = await getCurrentUser();
        if (user) {
            setEmailAddress(user.email || "");
        }
    }, [])
    
    useRequest(
        () => HttpClient.get<Profile>(`/profile`),
        {
            onSuccess: ({ data }) => {
                if (data) setProfile(data);
            },
            cacheKey: "profile",
            cacheTime: -1,
            staleTime: 600000 // 10 minutes
        }
    );

    const formik = useFormik({
        initialValues: {
            firstName: profile?.firstName,
            lastName: profile?.lastName,
            phoneNumber: profile?.phoneNumber,
        },
        validationSchema: profileSchema,
        onSubmit: async (values) => {
            setSaving(true);

            const { data, error } = await (
                profile 
                ? HttpClient.patch 
                : HttpClient.post
            )<Profile>("profile", values);

            if (error && !data) {
                setSaving(false);
                alert("An error occured while updating your profile! Please try again.");
                return
            }
            
            setProfile(data);
            setSaving(false);
            setUpdate(false);
        },
        enableReinitialize: true, 
    });

    return { 
        profile, 
        update, 
        saving, 
        formik,
        emailAddress,
        setUpdate
    }
}

export default useUpdateProfile;