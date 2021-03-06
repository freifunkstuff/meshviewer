define(['snabbdom', 'helper', 'moment'], function (V, helper, moment) {
  'use strict';
  V = V.default;

  var self = {};

  function showBar(v, width, warning) {
    return V.h('span',
      { props: { className: 'bar' + (warning ? ' warning' : '') } },
      [
        V.h('span',
          {
            style: { width: (width * 100) + '%' }
          }),
        V.h('label', v)
      ]
    );
  }

  self.showStatus = function showStatus(d) {
    return V.h('td',
      { props: { className: d.is_online ? 'online' : 'offline' } },
      _.t((d.is_online ? 'node.lastOnline' : 'node.lastOffline'), {
        time: d.lastseen.fromNow(),
        date: d.lastseen.format('DD.MM.YYYY, H:mm:ss')
      }));
  };

  self.showGeoURI = function showGeoURI(d) {
    if (!helper.hasLocation(d)) {
      return undefined;
    }

    return V.h('td',
      V.h('a',
        { props: { href: 'geo:' + d.location.latitude + ',' + d.location.longitude } },
        Number(d.location.latitude.toFixed(6)) + ', ' + Number(d.location.longitude.toFixed(6))
      )
    );
  };

  self.showGateway = function showGateway(d) {
    return d.is_gateway ? _.t('yes') : undefined;
  };

  self.showFirmware = function showFirmware(d) {
    return [
      helper.dictGet(d, ['firmware', 'release']),
      helper.dictGet(d, ['firmware', 'base'])
    ].filter(function (n) {
      return n !== null;
    }).join(' / ') || undefined;
  };

  self.showUptime = function showUptime(d) {
    if (d.uptime === undefined) {
      return undefined;
    }
    return moment.utc(d.uptime).local().fromNow(true);
  };

  self.showFirstSeen = function showFirstSeen(d) {
    return d.firstseen.fromNow(true);
  };

  self.showLoad = function showLoad(d) {
    if (!d.loadavg) {
      return undefined;
    }
    return showBar(d.loadavg.toFixed(2), d.loadavg / (d.nproc || 1), d.loadavg >= d.nproc);
  };

  self.showRAM = function showRAM(d) {
    if (!d.memory_usage) {
      return undefined;
    }
    return showBar(Math.round(d.memory_usage * 100) + ' %', d.memory_usage, d.memory_usage >= 0.8);
  };

  self.showDomain = function showDomain(d) {
    var rt = d.domain;
    if (config.domainNames) {
      config.domainNames.some(function (t) {
        if (rt === t.domain) {
          rt = t.name;
          return true;
        }
      });
    }
    return rt;
  };

  self.countLocalClients = function countLocalClients(d, visited = {}) {
    if (d.node_id in visited) return 0;
    visited[d.node_id] = 1;

    var count = d.clients || 0;
    d.neighbours.forEach(function (n) {
      if (n.link.type === 'vpn') return;
      count += self.countLocalClients(n.node, visited);
    });
    return count;
  };

  self.showClients = function showClients(d) {
    if (!d.is_online) {
      return undefined;
    }

    var localClients = self.countLocalClients(d);

    var clients = [];
    if (d.clients !== undefined) {
      clients.push(
        V.h('span', [
          d.clients > 0 ? d.clients : _.t('none'),
          V.h('br'),
          V.h('i', { props: { className: 'ion-people', title: _.t('node.clients') } })
        ])
      );
    }
    if (d.clients_wifi24 !== undefined) {
      clients.push(
        V.h('span',
          { props: { className: 'legend-24ghz' } },
          [
            d.clients_wifi24,
            V.h('br'),
            V.h('span', { props: { className: 'symbol', title: '2,4 GHz' } })
          ]
        )
      );
    }
    if (d.clients_wifi5 !== undefined) {
      clients.push(
        V.h('span',
          { props: { className: 'legend-5ghz' } },
          [
            d.clients_wifi5,
            V.h('br'),
            V.h('span', { props: { className: 'symbol', title: '5 GHz' } })
          ]
        )
      );
    }
    if (d.clients_other !== undefined) {
      clients.push(
        V.h('span',
          { props: { className: 'legend-others' } },
          [
            d.clients_other,
            V.h('br'),
            V.h('span', { props: { className: 'symbol', title: _.t('others') } })
          ]
        )
      );
    }
    clients.push(
      V.h('span', [
        localClients > 0 ? localClients : _.t('none'),
        V.h('br'),
        V.h('i', { props: { className: 'ion-share-alt', title: _.t('node.localClients') } })
      ])
    );
    return V.h('td', { props: { className: 'clients' } }, clients);
  };

  self.showIPs = function showIPs(d) {
    if (!d.addresses)  {
      return undefined;
    }
    var string = [];
    var ips = d.addresses;
    ips.sort();
    ips.forEach(function (ip, i) {
      if (i > 0) {
        string.push(V.h('br'));
      }

      if (ip.indexOf(':') > 0) {
        string.push(V.h('a', { props: { href: 'http://[' + ip + ']/', target: '_blank' } }, ip));
      } else {
        string.push(V.h('a', { props: { href: 'http://' + ip + '/', target: '_blank' } }, ip));
      }
    });
    return V.h('td', string);
  };

  self.showAutoupdate = function showAutoupdate(d) {
    if (!d.autoupdater) {
      return undefined;
    }
    return d.autoupdater.enabled ? _.t('node.activated', { branch: d.autoupdater.branch }) : _.t('node.deactivated');
  };

  return self;
});
