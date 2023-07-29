import { component$ } from "@builder.io/qwik";
import { Link } from '@builder.io/qwik-city';
import { LuSigma, LuSun, LuRocket } from "@qwikest/icons/lucide";

export const Header = component$(() => {
  return (
    <header class="header py-4 border-b bg-amber-200">
      <div class="container mx-auto">
        <nav class="header__nav flex justify-center">
          <Link href="/math" class="nav__link border-2 border-amber-500 p-2 rounded-xl mr-3 inline-block hover:bg-amber-500 transition-colors flex items-center gap-1">
            <LuSigma />
            Math
          </Link>
          <Link href="/sunset-sunrise" class="nav__link border-2 border-amber-500 p-2 rounded-xl mr-3 inline-block hover:bg-amber-500 transition-colors flex items-center gap-1">
            <LuSun />
            Sunset and sunrise
          </Link>
          <Link href="/satellities" class="nav__link border-2 border-amber-500 p-2 rounded-xl inline-block hover:bg-amber-500 transition-colors flex items-center gap-1">
            <LuRocket />
            Satellites
          </Link>
        </nav>
      </div>
    </header>
  );
});
