import { defineStore } from 'pinia'
import { cloneDeep, omit } from 'lodash'
import * as UserService from '@/services/user'
import { disconnect, ERoles, ping } from '@/services/user'
import { Toast } from '@/modules/'
import { testRequest as wrapRequestWithToast } from '@/modules/toast'
import { useStore as useAssociationStore } from '@/modules/association'

export const useStore = defineStore({
  id: 'user',
  actions: {
    async disconnect() {
      await wrapRequestWithToast(disconnect)

      this.$reset()
    },
    hasRoles(roles: ERoles[]): boolean { // C'est vraiment une action ça ? Je m'aurais mis dans les getters.
      return this.isAdmin || roles.every(role => this.roles.includes(role))
    },
    async init() {
      if (!document.cookie?.includes('userId=')) return

      const response = await wrapRequestWithToast(ping, { onlyError: true })

      if (!response?._id) return

      this.$patch(omit(response, 'association'))
      const associationStore = useAssociationStore()

      if (!response.association) return associationStore.$reset()

      associationStore.init(response.association)
      this.association = response.association._id
    },
        async update(update: { password?: { new: string; old: string }; student?: { name: string; schoolName: string }; username?: string }) {
            const response = await Toast.testRequest(async () => {
                return await UserService.update(update);
            });

            if (response?.success && update.username) {
                this.username = update.username;
                this.student.name = update.student?.name || "";
            }
        },
        async updatePlatforms(platforms: { discord: string }) {
            const response = await Toast.testRequest(async () => {
                return await UserService.updatePlatforms(platforms);
            });

            if (response?.success) {
                this.platforms = cloneDeep(platforms);
            }
        },
        async uploadAvatar(file: File) {
            const response = await Toast.testRequest(async () => {
                return await UserService.uploadAvatar({ file });
            });

            if (response?.success) {
                this.avatar = response.avatar;
            }
        },
        async uploadCertificate(file: File) {
            const response = await Toast.testRequest(async () => {
                return await UserService.uploadCertificate({ file });
            });

            if (response?.success) {
                await this.init();
            }
        }
    },
    getters: {
        getAvatarUrl(): string {
            return UserService.getAvatarUrl({ id: this._id, avatar: this.avatar });
        },
        getCertificateUrl(): string {
            return UserService.getCertificateUrl({ id: this._id, certificate: this.student.certificate });
        },
        hasFederationRight(): boolean {
            if (this.isAdmin) {
                return true;
            }
            return this.roles.includes(ERoles.Member) && this.roles.includes(ERoles.Federation);
        },
        hasPartnersRight(): boolean {
            if (this.isAdmin) {
                return true;
            }
            return this.roles.includes(ERoles.Member) && this.roles.includes(ERoles.Partnership);
        },
        hasTournamentRight(): boolean {
            if (this.isAdmin) {
                return true;
            }
            return this.roles.includes(ERoles.Member) && this.roles.includes(ERoles.Tournament);
        },
        isAdmin(): boolean {
            return this.roles.includes(ERoles.Admin);
        },
        isMember(): boolean {
            if (this.isAdmin) {
                return true;
            }
            return this.roles.includes(ERoles.Member);
        }
    },
    state: () => ({
        _id: "",
        association: "",
        avatar: "",
        mail: "",
        platforms: {
            discord: ""
        },
        roles: [] as Array<string>,
        student: {
            name: "",
            certificate: "",
            schoolName: "",
            status: "undefined"
        },
        username: ""
    })
});
