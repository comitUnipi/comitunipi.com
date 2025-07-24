import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

type LoginForm = {
  npm: string;
  password: string;
  remember: boolean;
};

interface LoginProps {
  status?: string;
  canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
  const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
    npm: '',
    password: '',
    remember: false,
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('login'), {
      onFinish: () => reset('password'),
    });
  };

  return (
    <AuthLayout title="Masuk dengan akun" description="Masukan NPM dan password kamu">
      <Head title="Masuk dengan Akun" />
      <form className="mt-2 flex flex-col gap-6" onSubmit={submit}>
        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="npm">NPM</Label>
            <Input
              id="npm"
              type="text"
              required
              autoFocus
              tabIndex={1}
              autoComplete="npm"
              value={data.npm}
              onChange={(e) => setData('npm', e.target.value)}
              placeholder="npm"
            />
            <InputError message={errors.npm} />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              {canResetPassword && (
                <TextLink href={route('password.request')} className="ml-auto text-sm" tabIndex={5}>
                  Lupa password?
                </TextLink>
              )}
            </div>
            <Input
              id="password"
              type="password"
              required
              tabIndex={2}
              autoComplete="current-password"
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              placeholder="Password"
            />
            <InputError message={errors.password} />
          </div>
          <div className="flex items-center space-x-3">
            <Checkbox id="remember" name="remember" checked={data.remember} onClick={() => setData('remember', !data.remember)} tabIndex={3} />
            <Label htmlFor="remember">Remember me</Label>
          </div>
          <Button
            type="submit"
            className="mt-4 w-full cursor-pointer bg-blue-500 hover:bg-blue-600 dark:text-white"
            tabIndex={4}
            disabled={processing}
          >
            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
            Masuk
          </Button>
        </div>
        <div className="text-muted-foreground text-center text-sm">
          Kamu belum punya akun?{' '}
          <TextLink href={route('register')} tabIndex={5}>
            Daftar Sekarang!
          </TextLink>
        </div>
      </form>
      {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
    </AuthLayout>
  );
}
