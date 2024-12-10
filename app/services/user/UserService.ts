import { getApplicationsByProperty, getApplicationsByUser, getPropertiesByUser } from "@/app/lib/firestoreClient";
import { IApplication } from "@/app/types/application";

const userService = {
    async getDashboardApplications(userId: string) {
        if (!userId) {
            throw new Error('User ID is required');
        }

        try {
            // Fetch properties for the user
            const properties = await getPropertiesByUser(userId);

            // Fetch applications for each property
            const propertiesWithApplications = await Promise.all(properties.map(async (property) => {
                const applications = await getApplicationsByProperty(property.id);
                return {
                    ...property,
                    applications
                };
            }));

            const applicationsFromUserId: Array<IApplication> = await getApplicationsByUser(userId);

            // Aggregate all applications
            const allApplications = propertiesWithApplications.flatMap(property => property.applications);
            return {
                properties: propertiesWithApplications,
                applications: [...allApplications, ...applicationsFromUserId]
            };
        } catch (error) {
            console.error('Error fetching properties and applications:', error);
            throw new Error('Failed to fetch properties and applications');
        }
    },

    // You can add more functions for other user-related services here
};

export default userService;
