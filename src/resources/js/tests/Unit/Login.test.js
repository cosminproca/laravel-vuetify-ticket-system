import { createLocalVue, mount } from '@vue/test-utils';
import Login from '@/pages/auth/Login';
import Vuetify from 'vuetify';

describe('Login', () => {
  let wrapper;
  let vuetify;

  const localVue = createLocalVue();

  beforeEach(() => {
    vuetify = new Vuetify();

    wrapper = mount(Login, {
      localVue,
      vuetify
    });
  });

  it('is a Vue instance', () => {
    expect(wrapper.isVueInstance).toBeTruthy();
  });

  it('display validation errors', () => {
    wrapper.find('[type=email]').setValue('');
    wrapper.find('[type=password]').setValue('');

    expect(wrapper.vm.$refs.form.validate()).toBe(false);
  });

  it('disabled button', (done) => {
    wrapper.find('[type=email]').setValue('');
    wrapper.find('[type=password]').setValue('');

    const button = wrapper.find('[type=submit]');
    button.trigger('click');

    wrapper.vm.$refs.form.validate();

    wrapper.vm.$nextTick(async () => {
      await expect(
        wrapper.find('[type=submit]').attributes().disabled
      ).toBeDefined();
      done();
    });
  });

  it('validates good inputs', () => {
    wrapper.find('[type=email]').setValue('gigel.example@example.com');
    wrapper.find('[type=password]').setValue('password123');

    expect(wrapper.vm.$refs.form.validate()).toBe(true);
  });
});
