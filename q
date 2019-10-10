[33mcommit dfa6d5e4d8a72ba28a6cc9ee2fe5f1d618354725[m[33m ([m[1;36mHEAD -> [m[1;32mtd-sprint-06[m[33m, [m[1;31morigin/td-sprint-06[m[33m)[m
Merge: 782bbfd 30f0ca5
Author: Talal Danoun <tald7344@gmail.com>
Date:   Thu Oct 10 00:30:51 2019 +0300

    Merge with 'reverse-interaction' after finish the delete interaction

[1mdiff --cc src/app/user/UserConfig.ts[m
[1mindex 77ea9fd,9114bf9..a2d1c25[m
[1m--- a/src/app/user/UserConfig.ts[m
[1m+++ b/src/app/user/UserConfig.ts[m
[36m@@@ -1,8 -1,8 +1,9 @@@[m
  export class UserConfig {[m
    // public static sourceAPI = 'http://ishtar.96.lt/Ishtar/public/';[m
[31m-   // public static sourceAPI = 'http://dev-ishtar.96.lt/ishtar-backend/public/';[m
[31m-   public static sourceAPI = 'http://ishtar-art.de/ishtar-backend/public/';[m
[32m+   public static sourceAPI = 'http://dev-ishtar.96.lt/ishtar-backend/public/';[m
[32m+   // public static sourceAPI = 'http://ishtar-art.de/ishtar-backend/public/';[m
[32m+ [m
[32m +[m
    public static PaintingListAPI = UserConfig.sourceAPI + 'getAllPainting';[m
    public static PaintingImageAPI = UserConfig.sourceAPI + 'getPaintingImages';[m
    public static PaintingDetailsAPI = UserConfig.sourceAPI + 'getPaintingById';[m
