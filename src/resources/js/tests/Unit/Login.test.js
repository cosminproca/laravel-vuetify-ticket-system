import { createLocalVue, mount } from '@vue/test-utils';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';
import router from '@/router';
import flushPromises from 'flush-promises';
import Login from '@/pages/auth/Login';

describe('Login', () => {
  let wrapper;
  let vuetify;

  beforeEach(() => {
    const localVue = createLocalVue();

    vuetify = new Vuetify();

    localVue.use(VueRouter);

    wrapper = mount(Login, {
      localVue,
      router,
      vuetify
    });
  });

  it('display validation errors', async () => {
    await wrapper.find('input[data-automation=email]').setValue('');
    await wrapper.find('input[data-automation=password]').setValue('');

    await flushPromises();

    const errors = await wrapper.find('.v-messages');
    expect(errors.text()).toBeTruthy();
  });

  it('disabled button', async () => {
    await wrapper.find('input[data-automation=email]').setValue('');
    await wrapper.find('input[data-automation=password]').setValue('');

    const button = await wrapper.find('button[data-automation=submit_button]');

    await flushPromises();

    expect(button.attributes().disabled).toBeDefined();
  });

  it('validates good inputs', async () => {
    await wrapper
      .find('input[data-automation=email]')
      .setValue('gigel.example@example.com');
    await wrapper
      .find('input[data-automation=password]')
      .setValue('password123');

    await flushPromises();

    const errors = await wrapper.find('.v-messages');
    expect(errors.text()).toBeFalsy();
  });
});
