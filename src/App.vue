<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { Capacitor } from '@capacitor/core';
import { Stripe } from '@capacitor-community/stripe';

// Initialize the Stripe plugin
if (Capacitor.isPluginAvailable("Stripe")) {
  debugger;
  Stripe.initialize({
    publishableKey : import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY,
  })
}
</script>
