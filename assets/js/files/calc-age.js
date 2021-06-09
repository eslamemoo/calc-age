let monthsInArbic = [
    "يناير",
    "فبراير",
    "مارس",
    "إبريل",
    "مايو",
    "يونية",
    "يوليو",
    "أغسطس",
    "سبتمير",
    "أكتوبر",
    "نوفمبر",
    "ديسمبر",
  ],
  hijriInArbic = [
    "محرم",
    "صفر",
    "ربيع الأول",
    "ربيع اللآخر",
    "جمادى الأولى",
    "جمادى اللآخرة",
    "رجب",
    "شعبان",
    "رمضان",
    "شوال",
    "ذو القعدة",
    "ذو الحجة",
  ],
  daysNameInArabic = [
    "الأحد",
    "الإثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
    "الجمعة",
    "السبت",
  ],
  horoType = `<ul><li> <b>الأبراج النارية:</b> وهي (برج الأسد، برج الحمل، وبرج القوس) ومواليد الأبراج النارية متسرّعون وعاطفيون بطبعهم، ويغلب عليهم التفاني والإخلاص بالعمل، ويتمتّعون بخيالٍ واسعٍ وقدراتٍ إبداعية، كما أنهم متسرّعون بردود أفعالهم.</li>
<li> <b>الأبراج الهوائية:</b> وهي (برج الميزان، برج الدلو، برج الجوزاء)، ويميل مواليد هذه الأبراج بشكلٍ عام للتفكير بطريقة عاطفية، فمشاعرهم وحدسهم يلعبان دوراً كبيراً في اتّخاذ قراراتهم الخاصة.</li>
<li> <b>الأبراج المائية:</b> وهي (برج السرطان، برج العقرب، وبرج الحوت) ومواليد هذه الأبرج يتمتّعون بقدرةٍ هائلةٍ على التركيز، وهم أيضاً حسّاسون للغاية، ويتميّزون بالعاطفة القويّة.</li>
<li> <b>الأبراج الترابية:</b> وهي (برج الجدي، برج الثور، وبرج العذراء) ويحبّ مواليد هذه الأبراج إتمام الأمور بهدوء وتأنٍ، ويتّخذون القرارات المتعلّقة بالتغييرات الحياتية والمصيرية ببطء شديد، كما أنهم يتمتّعون بقدرةٍ كبيرةٍ على التحمّل.</li></ul>`;
Vue.component("info-modal", {
  props: ["id", "title", "content"],
  template: `
  <div class="modal fade" :id="id" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{title}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="text-right" v-html="content" dir="rtl"></div>
          </div>
        </div>
      </div>
    </div>
  `,
});
let vm = new Vue({
  el: "#app",
  data: {
    year: null,
    month: null,
    day: null,
    monthsInArbic,
    hijriInArbic,
    daysNameInArabic,
    mainDiv: true,
    resltDiv: false,
    moreContent: false,
    moreContentText: "...أكمل القراءة",
    birthday: null,
    restBirthday: null,
    horo: null,
    horoType,
  },
  methods: {
    getDiff(birthday, DateNow) {
      var b = moment(birthday),
        a = moment(DateNow),
        intervals = ["years", "months", "days", "hours", "minutes"],
        out = [];
      intervals.forEach(function (interval) {
        var diff = a.diff(b, interval);
        b.add(diff, interval);
        out.push(diff);
      });
      out.push(daysNameInArabic[a.format("d")]);
      return out;
    },
    getBirthday(Inputyear, Inputmonth, Inputday) {
      var inputYear = parseInt(Inputyear),
        inputMonth = parseInt(Inputmonth),
        inputDay = parseInt(Inputday),
        birthday;

      var tempBirthday = moment([inputYear, inputMonth - 1, inputDay]);
      if (tempBirthday.isValid()) {
        if (tempBirthday.diff(new Date(), "days") < 0) {
          birthday = tempBirthday;
        }
      }

      return birthday;
    },
    rest() {
      let yearNow = parseInt(moment(new Date()).format("YYYY")),
        monthNow = parseInt(moment(new Date()).format("M")),
        dayNow = parseInt(moment(new Date()).format("D")),
        DateNow = moment(new Date()),
        date;
      if (vm.month > monthNow) {
        date = moment([yearNow, vm.month - 1, vm.day]);
      } else if (vm.month == monthNow) {
        if (vm.day > dayNow) {
          date = moment([yearNow, vm.month - 1, vm.day]);
        } else {
          date = moment([yearNow + 1, vm.month - 1, vm.day]);
        }
      } else {
        date = moment([yearNow + 1, vm.month - 1, vm.day]);
      }
      var b = moment(DateNow),
        a = moment(date),
        intervals = ["months", "days", "hours", "minutes"],
        out = [];
      intervals.forEach(function (interval) {
        var diff = a.diff(b, interval);
        b.add(diff, interval);
        out.push(diff);
      });
      out.push(date.format("YYYY/M/D"));
      out.push(date.format("d"));
      return out;
    },
    getZodiac(year) {
      return getZodiac(year);
    },
    getSign(month, day) {
      return getSign({ month, day });
    },
    calcAge() {
      let today = moment(new Date()),
        birthday = vm.getBirthday(vm.year, vm.month, vm.day),
        age = vm.getDiff(birthday, today);
      vm.restBirthday = vm.rest();
      vm.birthday = {
        year: age[0],
        month: age[1],
        day: age[2],
        hours: age[3],
        minutes: age[4],
        dayName: daysNameInArabic[birthday.format("d")],
      };
      vm.horo = {
        zodiac: vm.getZodiac(vm.year),
        sign: vm.getSign(vm.month, vm.day),
      };
      vm.mainDiv = false;
      vm.resltDiv = true;
    },
    readMore() {
      vm.moreContent = !vm.moreContent;
      if (vm.moreContent) {
        vm.moreContentText = "أخفِ";
      } else {
        vm.moreContentText = "...أكمل القراءة";
      }
    },
    showModal(modalId) {
      $(`#${modalId}`).modal();
    },
    clear() {
      this.year = this.month = this.day = this.data = null;
      vm.mainDiv = true;
      vm.resltDiv = false;
      vm.moreContent = false;
      vm.moreContentText = "...أكمل القراءة";
    },
  },
  computed: {
    years() {
      let t = new Date().getFullYear();
      return Array.from({ length: t - 1899 }, (a, e) => t - e);
    },
    months: () => Array.from({ length: 12 }, (t, a) => 1 + a),
    days() {
      return Array.from(
        { length: new Date(this.year, this.month, 0).getDate() },
        (t, a) => 1 + a
      );
    },
    hijri() {
      let t = `${this.year}-${this.month}-${this.day}`;
      return {
        year: moment(t, "YYYY-M-D").format("iYYYY"),
        month: parseInt(moment(t, "YYYY-M-D").format("iM/")),
        day: moment(t, "YYYY-M-D").format("iD"),
      };
    },
  },
});
