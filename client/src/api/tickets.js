import request from 'superagent';

import {
  coreUrl
} from '../config';

function endpoint(s) {
  return `${coreUrl}/api/v1/${s}`
};

export async function newComment(ticketId, payload) {
  const response = await request
    .post(endpoint(`tickets/${ticketId}/comment`))
    .send(payload)
    .accept('json');

  return response.body;
};

export async function reopenTicket(id) {
  const response = await request
    .put(endpoint(`tickets/${id}/reopen`))
    .accept('json');

  return response.body;
};

export async function closeTicket(id) {
  const response = await request
    .put(endpoint(`tickets/${id}/close`))
    .accept('json');

  return response.body;
};

export async function loadTicket(id) {
  const response = await request
    .get(endpoint(`tickets/${id}`))
    .accept('json');

  return response.body;
};

export async function loadTickets(page = 1, filters = null, sorts = null) {
  let query = {};

  if (Object.keys(filters).length) {
    query['_filters'] = JSON.stringify(filters);
  }

  if (Object.keys(sorts).length) {
    query['_sorts'] = JSON.stringify(sorts);
  }

  const response = await request
    .get(endpoint('tickets'))
    .accept('json')
    .query(query);

  return response.body;
};

export const _filters = [{
  title: 'New',
  query: {
    'state': {
      '$in': ['new']
    }
  },
  checked: false
}, {
  title: 'Pending',
  query: {
    'state': {
      '$in': ['pending']
    }
  },
  checked: false
}, {
  title: 'Closed',
  query: {
    'state': {
      '$in': ['closed']
    }
  },
  checked: false
}];

export const _sorts = [{
  title: 'Updated recently',
  query: {
    updated_at: -1
  },
  checked: false
}, {
  title: 'Created recently',
  query: {
    created_at: -1
  },
  checked: false
}];
