<template>
    <div class="admin-members">
        Membres
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import * as AdminService from "@/services/admin";

export default defineComponent({
    name: "SAdminPanelMembers",
    setup() {
        onMounted(async() => {
            const users = await AdminService.userSearch({
                limit: 20,
                search: "",
                skip: 0
            });
            console.log(users);
        });
    }
});
</script>

<style scoped lang="scss">

</style>
