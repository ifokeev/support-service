import {
  App,
  Tickets,
  Ticket,
  Dashboard,
  NotFound
} from './components';

const DashboardChilds = [{
  path: 'tickets',
  name: 'Tickets List',
  indexRoute: {
    onEnter: (nextState, replace) => {
      const query = nextState.location.query;

      if (query && !query.sorts) {
        replace('/dashboard/tickets?sorts=0');
      }
    },
    component: Tickets
  },
  childRoutes: [{
    path: ':id',
    name: 'Ticket',
    component: Ticket
  }]
}];

const AppChilds = [{
  path: '404',
  component: NotFound
}, {
  path: 'dashboard',
  name: 'Dashboard',
  indexRoute: {
    onEnter: (_, replace) => {
      replace('/dashboard/tickets?sorts=0');
    }
  },
  childRoutes: DashboardChilds
}];

const routes = {
  path: '/',
  name: 'App',
  component: App,
  childRoutes: AppChilds
};

export default routes;
