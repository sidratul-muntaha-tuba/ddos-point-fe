export const baseBeUrl = "http://localhost:5500/";
export const initialStartUrl = "initial-start";

export const clientRolesUrl = "enums/roles/client";
export const gendersUrl = "enums/genders";
export const bloodGroupsUrl = "enums/blood-groups";
export const relationshipsUrl = "enums/relations";

export const phoneNumberValidationUrl = "validations/phone-number";
export const emailValidationInUsersTable = (email) =>
	`validations/email/${email}/users`;
export const userRegistrationUrl = "users";
export const loginUrl = "auth/login";
export const userInfoByIdUrl = (userId) => `users/${userId}`;
export const verifiedDocotrsList = "doctors/verified-by-specialization";
export const patientRegistrationUrl = "patients";
