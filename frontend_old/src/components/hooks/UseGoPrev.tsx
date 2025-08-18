import { useNavigate } from "@tanstack/react-router";
import { useNavigatePages } from "./UseNavigatePages";
import { useLogOut } from "./useLogOut/UseLogOut";

export const useGoPrev = () => {
  const navigate = useNavigate();
  const { currentIndex } = useNavigatePages();
  const logout = useLogOut();
  const goPrev = () => {
    switch (currentIndex) {
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
      case 10:
      case 11:
        navigate({ to: "/anasayfa" });
        break;
      case 4:
        navigate({ to: "/" });
        break;
      case 3:
        navigate({ to: "/anasayfa" });
        break;
      case 2:
        navigate({ to: "/anasayfa" });
        break;
      case 1:
        //Eğer /anasqyfa sayfasındaysam ve geri gidiceksem kullanıcı giriş sayfasına çıkış yapmak isteyip istemeyeceğinin mesajını göderiyorum okeylerse çıkış  yapıyor.
        if (currentIndex === 1) {
          const isConfirmed = confirm("çıkış mı yapmak istiyorsunuz?");
          //çıkış işlemi
          if (isConfirmed) {
            const success = logout();
            alert(success ? "çıkış başarılı" : "çıkış başarısız");
          }
          // eğer hayır ise hiçbir şey yapma

          break;
        }
    }
  };
  return goPrev;
};
