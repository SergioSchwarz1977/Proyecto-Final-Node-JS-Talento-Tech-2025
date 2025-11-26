import { db } from "../data/data.js";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, getDoc } from "firebase/firestore";

function createProducts(producto) {
    return (
        new Promise(async (res, rej) => {
            try {
                const docRef = await addDoc(collection(db, "products"), producto);
                console.log("Doc ID: ", docRef.id, "Producto: ", docRef)
                res({ ...producto, id: docRef.id })
            } catch (error) {
                console.log(error)
                rej(error)
            }
        })
    )
};

//createProducts({nombre: "yerba", categoria: "infusion", precio: 200})

function deleteProducts(id) {
    return (
        new Promise(async (res, rej) => {
            try {
                const docRef = doc(db, "products", id);
                const docSnap = await getDoc(docRef);

                // Si no existe, rechazamos con error marcado (status 404)
                if (!docSnap.exists()) {
                    const err = new Error("No se encontro el producto");
                    err.status = 404;
                    return rej(err);
                }

                await deleteDoc(docRef);
                console.log("Producto eliminado con exito")
                res("Producto eliminado con exito")
            } catch (error) {
                rej(error)
            }
        })
    )
}

//deleteProducts("kKk4LP7OZGrw6kS59zrg")

function updateProducts(id, producto) {
    return (
        new Promise(async (res, rej) => {
            try {
                await updateDoc(doc(db, "products", id), {
                    ...producto
                })
                console.log("Producto actualizado con exito")
                res({producto, id})
            } catch (error) {
                console.log(error)
                rej(error)
            }
        })
    )

}

//updateProducts({id: "fVu5C4s2t5vHqrU2hKrf", precio: 950})

function getAllProducts() {
    return new Promise(async (res, rej) => {
        try {
            const querySnapshot = await getDocs(collection(db, "products"));
            const products = [];
            querySnapshot.forEach((doc) => {
                products.push({ ...doc.data(), id: doc.id })
                console.log(doc.id, " => ", doc.data());
            })
            res(products)
        } catch (error) {
            rej(error)
        }
    })
}
//getAllProducts();

function getProductById(id) {
    return new Promise(async (res, rej) => {
        try {
            const docRef = doc(db, "products", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                res({ ...docSnap.data(), id: docSnap.id })
            } else {
                console.log("No se encontro el producto");
                rej("No se encontro el producto")
            }
        } catch (error) {
            console.log(error)
            rej("Error al buscar el producto" + error)
        }
    })
}

//getProductById(id="fVu5C4s2t5vHqrU2hKrf")

export { createProducts, deleteProducts, updateProducts, getAllProducts, getProductById };