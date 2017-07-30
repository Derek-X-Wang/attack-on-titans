import Vue from 'vue';
import Router from 'vue-router';
import Container from '@/components/Container';
import Hello from '@/components/Hello';
import Credits from '@/components/Credits';
import Interview from '@/components/Interview';
import GoogleTheme from '@/components/GoogleTheme';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Website',
      component: Container,
      children: [
        {
          path: '',
          component: Hello,
        },
        {
          path: 'credits',
          component: Credits,
        },
      ],
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
