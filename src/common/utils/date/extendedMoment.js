import moment from 'moment';

moment.locale('sv');
moment.locale('nb');
moment.locale('da');
moment.locale('fi');

moment.defineLocale('sv-tcne', {
  parentLocale: 'sv',
  weekdaysShort: 'sön_mån_tis_ons_tors_fre_lör'.split('_'),
});

moment.defineLocale('nb-tcne', {
  parentLocale: 'nb',
  monthsShort: 'jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des'.split('_'),
  weekdaysShort: 'sø._ma._ti._on._to._fr._lø.'.split('_'),
});

moment.defineLocale('da-tcne', {
  parentLocale: 'da',
  weekdaysShort: 'søn_man_tir_ons_tor_fre_lør'.split('_'),
});

moment.defineLocale('fi-tcne', {
  parentLocale: 'fi',
  weekdaysShort: 'su_ma_ti_ke_to_pe_la'.split('_'),
});

export default moment;
