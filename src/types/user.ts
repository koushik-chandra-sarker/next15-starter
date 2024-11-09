interface UserType {
    id?: string;
    name?: string;
    email?: string;
    avatar?: string;
    premiumSubscription?: boolean;
    accessToken?: string;
    refreshToken?: string;
    subId?: string;
}
interface JwtType {
    accessToken?: string;
    accessTokenExpires?: number;
    refreshToken?: string;
}

type UserResponseType = {
    id?: string;
    name?: string;
    email?: string;
    avatar?: string;
    premium_subscription?: boolean;
    access_token?: string;
    refresh_token?: string;
    sub_id?: string;
};

export type { UserType, JwtType, UserResponseType };
