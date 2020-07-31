import {Storage} from '@google-cloud/storage';
// import {join} from 'path';

class StorageBucket {
  constructor({name}) {
    this.name = name;
  }

  async createBucketIfNotExist() {
    const storage = new Storage({credentials: {
      client_email: process.env.CLIENT_EMAIL,
      private_key: process.env.PRIVATE_KEY,
    }});
    const bucket = await storage.bucket(this.name);

    if (bucket.exists()) {
      console.log(`Bucket ${this.name} already exists!`);
      this.bucket = bucket;
    } else {
      const newBucket = await storage.createBucket(this.name);
      console.log(`Bucket ${this.name} created.`);
      this.bucket = newBucket;
    }
  }

  async uploadFile(fileName, filePath='./files/neptune.jpg') {
    await this.bucket.upload(filePath, {
      destination: fileName,
    });
  }

  async getFileLinks(prefix) {
    const files = await this.bucket.getFiles({prefix});
    const fileLinks = files[0].map((file) => file.metadata.mediaLink);
    return fileLinks;
  }

  // async getFiles(prefix) {
  //   const files = await this.bucket.getFiles({prefix});
  //   console.log(files[0][0].download);
  //   await files[0][0].download({
  //  destination: join(__dirname, '../files/download.jpg')
  // });
  // }
};

export default StorageBucket;
