import Vue from 'vue';
import Router from 'vue-router';
import Website from '@/components/Website';
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
      component: Website,
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
          path: 'google/:id',
          name: 'google',
          component: GoogleTheme,
          props: true,
        },
      ],
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
