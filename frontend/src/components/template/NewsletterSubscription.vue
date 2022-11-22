<template>
    <div id="mc_embed_signup">
        <SSectionTitle class="title">Newsletter</SSectionTitle>
        <form action="https://sgnw.us20.list-manage.com/subscribe/post?u=80afd6afd952ad5837f61864e&amp;id=d7c0df515b&amp;f_id=00504ee6f0" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
            <div id="mc_embed_signup_scroll">
                <div class="description">
                    N'hésitez pas à vous inscrire à la newsletter pour suivre toutes les dernières actus<br>
                    de nos assos, de nos tournois et bien plus encore !
                </div>
                <!-- <div class="indicates-required"><span class="asterisk">*</span> indicates required</div> -->
                <div class="mc-field-group">
                    <!-- <label for="mce-EMAIL">Adresse mail  <span class="asterisk">*</span></label> -->
                    <!-- <SInput
                        value=""
                        name="EMAIL"
                        type="email"
                        class="required email"
                        id="mce-EMAIL"
                        title="Adresse email"
                        required
                    /> -->
                    <input type="email" placeholder="Adresse mail" value="" name="EMAIL" class="required email" id="mce-EMAIL" required>
                </div>
                <div id="mce-responses" class="clear foot">
                    <div class="response" id="mce-error-response" style="display:none"></div>
                    <div class="response" id="mce-success-response" style="display:none"></div>
                </div>    <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
                <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_80afd6afd952ad5837f61864e_d7c0df515b" tabindex="-1" value=""></div>
                <div class="optionalParent">
                    <div class="clear foot">
                        <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button">
                        <p class="brandingLogo"><a href="http://eepurl.com/h-tyb5" title="Mailchimp - email marketing made easy and fun"><img src="https://eep.io/mc-cdn-images/template_images/branding_logo_text_light_dtp.svg"></a></p>
                    </div>
                </div>
            </div>
        </form>
    </div>
    <link href="//cdn-images.mailchimp.com/embedcode/classic-071822.css" rel="stylesheet" type="text/css">
</template>

<script lang="ts">
    import { defineComponent } from "vue";
    import SSectionTitle from "@/components/design/SectionTitle.vue";
    import SInput from "@/components/design/forms/Input.vue";

    export default defineComponent({
        name: "NewsletterSub",
        components: { SSectionTitle, SInput },
        mounted() {
            let mcValidate = document.createElement('script');
            mcValidate.setAttribute('src', '//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js');
            document.head.appendChild(mcValidate);
        },
    });
</script>

<style scoped lang="scss">
	#mc_embed_signup {
        padding-top: 36px;
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

        .description {
            text-align: center;
            opacity: 0.5;
            font-weight: 400;
            margin: 24px;
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
</style>