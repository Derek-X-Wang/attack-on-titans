import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import Interview from '@/components/Interview';
import GoogleTheme from '@/components/GoogleTheme';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
    },
    {
      path: '/interview',
      name: 'Interview',
      component: Interview,
      children: [
        {
          path: 'google',
          component: GoogleTheme,
        },
      ],
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
