import { createLocalVue, mount } from '@vue/test-utils';
import Home from '@/pages/Home';
import Vuetify from 'vuetify';

describe('Home', () => {
  let wrapper;
  let vuetify;

  const localVue = createLocalVue();

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it('Should be a Vue instance', () => {
    wrapper = mount(Home, {
      localVue,
      vuetify
    });

    expect(wrapper.isVueInstance).toBeTruthy();
  });

  it('Should render relative dates', () => {
    wrapper = mount(Home, {
      localVue,
      vuetify
    });

    expect(wrapper.text()).toContain('Today');
    expect(wrapper.text()).toContain('Yesterday');
  });
});
