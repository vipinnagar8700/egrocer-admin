<script>
export default {
    methods: {
        $can(permissionName) {
            return UserPermissions.indexOf(permissionName) !== -1;
        },
        $role(roleName) {
            return Role === roleName;
        },
    },
};
</script>
