<template>
    <ion-button @click=handleCheckout :disabled="loading">
      {{loading ? "Loading..." : "Checkout - Payment Sheet"}}
    </ion-button>
</template>
<script setup lang="ts">
import { Stripe } from "@capacitor-community/stripe";
import { ref } from 'vue';
import { IonButton } from "@ionic/vue";

const loading = ref<boolean>(false);

const handleCheckout = async () => {
    loading.value =true;

    try {
      const response = await fetch(
        "http://192.168.1.56:3000/create-payment-intent",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: 1000, currency: "usd" }),
        }
      );

      const data = await response.json();
      console.log("PaymentIntent client secret:", data.clientSecret);

      await Stripe.createPaymentSheet({
        paymentIntentClientSecret: data.clientSecret,
        merchantDisplayName: "Inclusive Innovation Incubator",
      });

      const { paymentResult } = await Stripe.presentPaymentSheet();
      console.log(paymentResult);

    } catch (error) {
      console.error("Payment failed:", error);
    } finally {
      loading.value = false;
    }
  };
</script>