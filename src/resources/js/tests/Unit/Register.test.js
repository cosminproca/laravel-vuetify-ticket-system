import { createLocalVue, mount } from '@vue/test-utils';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';
import router from '@/router';
import flushPromises from 'flush-promises';
import Register from '@/pages/auth/Register';

describe('Register', () => {
  let wrapper;
  let vuetify;

  beforeEach(() => {
    const localVue = createLocalVue();

    vuetify = new Vuetify();

    localVue.use(VueRouter);

    wrapper = mount(Register, {
      localVue,
      router,
      vuetify
    });
  });

  it('display validation errors', async () => {
    await wrapper.find('input[data-automation=email]').setValue('');
    await wrapper.find('input[data-automation=password]').setValue('');
    await wrapper
      .find('input[data-automation=password_confirmation]')
      .setValue('');

    await flushPromises();

    const errors = await wrapper.find('.v-messages');
    expect(errors.text()).toBeTruthy();
  });

  it('disabled button', async () => {
    await wrapper.find('input[data-automation=email]').setValue('');
    await wrapper.find('input[data-automation=password]').setValue('');
    await wrapper
      .find('input[data-automation=password_confirmation]')
      .setValue('');

    const button = await wrapper.find('button[data-automation=submit_button]');

    await flushPromises();

    expect(button.attributes().disabled).toBeDefined();
  });

  it('confirms password', async () => {
    await wrapper
      .find('input[data-automation=email]')
      .setValue('test@example.com');
    await wrapper.find('input[data-automation=password]').setValue('password');
    const passwordConfirmation = await wrapper.find(
      'input[data-automation=password_confirmation]'
    );

    await passwordConfirmation.setValue('passwordd');
    await passwordConfirmation.trigger('focus');
    await passwordConfirmation.trigger('blur');

    const button = await wrapper.find('button[data-automation=submit_button]');

    await flushPromises();

    expect(button.attributes().disabled).toBeDefined();
  });

  it('validates good inputs', async () => {
    await wrapper
      .find('input[data-automation=email]')
      .setValue('test@example.com');
    await wrapper.find('input[data-automation=password]').setValue('password');
    await wrapper
      .find('input[data-automation=password_confirmation]')
      .setValue('password');

    await flushPromises();

    const errors = await wrapper.find('.v-messages');
    expect(errors.text()).toBeFalsy();
  });
});
