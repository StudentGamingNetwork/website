<template>
    <section class="newsletter-section">
        <SSectionTitle class="title">
            Newsletter
        </SSectionTitle>
        <div class="description">
            N'hésitez pas à vous inscrire à notre Newsletter pour être au courant des dernières actualités :<br>
            retrouvez les associations de la fédération, nos tournois, nos événements et bien plus encore !
        </div>
        <div id="mc_embed_signup">
            <form
                id="mc-embedded-subscribe-form"
                action="https://sgnw.us20.list-manage.com/subscribe/post?u=80afd6afd952ad5837f61864e&amp;id=d7c0df515b&amp;f_id=00504ee6f0"
                class="validate"
                method="post"
                name="mc-embedded-subscribe-form"
                novalidate
                target="_blank"
            >
                <div id="mc_embed_signup_scroll">
                    <div class="mc-field-group">
                        <!-- <SInput
                            id="mce-EMAIL"
                            class="required email"
                            name="EMAIL"
                            required
                            title="Adresse email"
                            type="email"
                            value=""
                        /> -->
                        <input
                            id="mce-EMAIL"
                            class="required email"
                            name="EMAIL"
                            placeholder="Adresse mail"
                            required
                            type="email"
                            value=""
                        >
                    </div>

                    <div hidden="true">
                        <input
                            name="tags"
                            type="hidden"
                            value="45545"
                        >
                    </div>
                    <div
                        id="mce-responses"
                        class="clear foot"
                    >
                        <div
                            id="mce-error-response"
                            class="response"
                            style="display:none"
                        />
                        <div
                            id="mce-success-response"
                            class="response"
                            style="display:none"
                        />
                    </div>    
                    <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
                    <div
                        aria-hidden="true"
                        style="position: absolute; left: -5000px;"
                    >
                        <input
                            name="b_80afd6afd952ad5837f61864e_d7c0df515b"
                            tabindex="-1"
                            type="text"
                            value=""
                        >
                    </div>
                    <div class="optionalParent">
                        <div class="clear foot">
                            <input
                                id="mc-embedded-subscribe"
                                class="button"
                                name="subscribe"
                                type="submit"
                                value="S'inscrire"
                            >
                            <p class="brandingLogo">
                                <a
                                    href="http://eepurl.com/h-tyb5"
                                    title="Mailchimp - email marketing made easy and fun"
                                ><img src="https://eep.io/mc-cdn-images/template_images/branding_logo_text_light_dtp.svg"></a>
                            </p>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <link
            href="//cdn-images.mailchimp.com/embedcode/classic-071822.css"
            rel="stylesheet"
            type="text/css"
        >
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SSectionTitle from "@/components/design/SectionTitle.vue";
import SInput from "@/components/design/forms/Input.vue";

export default defineComponent({
    name: "NewsletterSub",
    components: { SInput, SSectionTitle },
    mounted() {
        let mcValidate = document.createElement("script");
        mcValidate.setAttribute("src", "//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js");
        document.head.appendChild(mcValidate);
    }
});
</script>

<style scoped lang="scss">
    .newsletter-section {
        padding-top: 36px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--length-gap-l);

        .title {
            text-align: center;
        }

        .description {
            text-align: center;
            opacity: 0.5;
        }

        #mc_embed_signup {
            clear: left; 
            margin: 0 auto 0 auto;
            font: 14px Helvetica, Arial, sans-serif;  
            width: 600px;
            text-align: center;

            /* Custom Css */

            h2 {
                font-weight: 200;
                padding: 0;
                margin: 15px 0;
                font-size: 2.5em;
                font-family: "Poppins", sans-serif;
            }

            .button {
                height: 2.5em;
                border: 2px solid var(--color-content-softer);
                padding: 0 calc(var(--length-padding-m) - 2px);
                background-color: var(--color-background-1);
            }

            .mc-field-group {
                
                input {
                    background: var(--color-background-1);
                    color: var(--color-primary);
                }
            }
        }
    }

	
</style>
