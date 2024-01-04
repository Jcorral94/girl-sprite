class Girl {
  constructor(x, y, ctx, canvas, direction) {
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.canvas = canvas;
    this.direction = direction;
    this.index = 0;
    this.prev = null;
    this.loading = true;
    this.images = {};
    this.paths = [
      {
        filePath: './assets/Magic_Girl_Idle_animation.png',
        action: 'idle'
      },
      {
        filePath: './assets/Magic_Girl_Walk_animation.png',
        action: 'left'
      },
      {
        filePath: './assets/Magic_Girl_Walk_down_animation.png',
        action: 'down'
      },
      {
        filePath: './assets/Magic_Girl_Walk_Right_animation.png',
        action: 'right'
      },
      {
        filePath: './assets/Magic_Girl_Walk_up_animation.png',
        action: 'up'
      }
    ];
    this.positions = {
      idle: [],
      left: [],
      right: [],
      up: [],
      down: []
    };
    this.assetsDimensions = {
      idle: {
        width: 36,
        height: 44,
        totalImages: 8
      },
      left: {
        width: 38,
        height: 44,
        totalImages: 6
      },
      right: {
        width: 29,
        height: 44,
        totalImages: 6
      },
      up: {
        width: 25,
        height: 44,
        totalImages: 8
      },
      down: {
        width: 24,
        height: 44,
        totalImages: 8
      }
    }
    this.controller = {
      up: {
        x: 0,
        y: -10
      },
      down: {
        x: 0,
        y: 10
      },
      left: {
        x: -10,
        y: 0
      },
      right: {
        x: 10,
        y: 0
      }
    };
  }
  async initImages() {
    for (let i = 0; i < this.paths.length; i++) {
      const currentPath = this.paths[i].filePath;
      const currentAction = this.paths[i].action;
      await this.loadPathAndImages(currentPath, currentAction);
    }

    this.loading = false;
  }
  loadPathAndImages(path, action) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = path;
      this.images[action] = img;
      img.onload = () => {
        let sx = 0;
        let sy = 0;
        for (let i = 0; i < this.assetsDimensions[action].totalImages; i++) {
          this.positions[action].push({
            sx,
            sy,
            width: this.assetsDimensions[action].width,
            height: this.assetsDimensions[action].height
          });

          sx += this.assetsDimensions[action].width;
        }

        resolve(this);
      }
    });
  }
  show() {
    this.ctx.beginPath();
    this.ctx.drawImage(
      this.images[this.direction],
      this.positions[this.direction][this.index].sx,
      this.positions[this.direction][this.index].sy,
      this.positions[this.direction][this.index].width,
      this.positions[this.direction][this.index].height,
      this.x,
      this.y,
      this.positions[this.direction][this.index].width,
      this.positions[this.direction][this.index].height,
    );
    this.ctx.fill();
    this.ctx.closePath();
  }
  update(direction, prev) {
    this.direction = direction;
    this.prev = prev || this.prev;
    this.x += this.controller[this.direction].x;
    this.y += this.controller[this.direction].y;

    if (this.index == this.positions[this.direction].length - 1) {
      this.index = 0;
    } else {
      this.index += 1;
    }

    if (this.prev && this.prev !== this.direction) {
      this.index = 0;
      this.prev = null;
    }

  }
}
